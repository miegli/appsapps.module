import {PersistableModel} from "appsapp-cli";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";


export class SelectModel extends PersistableModel {

    private options: any = [];
    private data: any = [];
    private dataCached: any = {};
    public parent: any = null;
    private parentProperty: string = null;
    private url: string = '';
    private mapping: {
        text: string | Function,
        value?: string | Function,
        disabled?: boolean | Function,
        group?: string
    };
    private dataType: string = 'json';
    private __regex = /(\$\w+)[\/]*/g;
    private __currentUrl: string = '';
    private __registeredUrls: object = {};
    private __lastHash = '';

    constructor() {

        super();


    }

    public init() {

        let self = this;


        if (self.matchAll(this.url, this.__regex)) {
            if (self.parent && self.parent.getPropertyValue !== undefined) {
                self.matchAll(this.url, this.__regex).forEach((m) => {
                    self.parent.watch(m[1].substr(1), (data) => {
                        self.options = [];
                        self.data = [];
                        self.fetchdata(self.url, m[1].substr(1), data);
                    });
                });
            }
        }

        if (self.url.length) {
            self.fetchdata(this.url);
        }


    }


    private fetchdata = function (url, property?, data?) {

        var finalurl = url, self = this;


        if (finalurl !== undefined && self.parent && self.parent instanceof PersistableModel) {


            if (this.matchAll(url, this.__regex)) {

                this.matchAll(url, this.__regex).forEach((m) => {
                    var d = property == m[1].substr(1) ? data : self.parent[m[1].substr(1)];
                    d = d === undefined ? null : d.toString();
                    if (d && typeof d == 'string' && d.length) {
                        finalurl = finalurl.replace(m[1], d);
                    } else {
                        finalurl = '';
                    }
                });
            }


            if (finalurl.length) {

                this.__currentUrl = finalurl;

                var finalurlHash = self.getAppsAppModuleProvider().getPersistenceManager().getHash(finalurl);
                if (self.dataCached[finalurlHash] !== undefined && self.dataCached[finalurlHash]) {
                    self.update('data', JSON.parse(self.dataCached[finalurlHash]));
                }
                if (finalurl.substr(0, 4) == 'http') {
                    this.getHttpClient().get(finalurl).subscribe((data) => {
                        self.dataCached[finalurlHash] = JSON.stringify(data);
                        self.update('data', data);
                    }, (error) => {
                        // skip error
                    });
                }
                if (finalurl.substr(0, 1) == '/') {


                    if (self.parent instanceof PersistableModel) {

                        self.loaded().then(() => {

                            if (self.parent) {
                                var path = self.getFirebaseDatabaseSessionPath(finalurl);

                                if (self.__registeredUrls[finalurl] === undefined) {
                                    self.update('data', []);
                                    self.__registeredUrls[finalurl] = path;
                                    self.parent.getFirebaseDatabase().object(path).query.on('value', (event) => {
                                        self.updateFromFirebase(event, finalurlHash);
                                    });
                                } else {
                                    self.parent.getFirebaseDatabase().object(path).query.once('value', (event) => {
                                        self.updateFromFirebase(event, finalurlHash);
                                    });
                                }
                            }

                        });


                    }


                }
            } else {
                self.update('data', []);
            }

        }


    }

    /**
     *
     * @param event
     * @param finalurlHash
     */
    public updateFromFirebase(event, finalurlHash) {
        let self = this;

        if (event && event.ref.path.toString().indexOf(self.__registeredUrls[self.__currentUrl]) >= 0) {
            let data = event.val();

            if (data) {
                if (typeof data.forEach !== 'function') {

                    var tmp = [];
                    Object.keys(data).forEach((v) => {
                        tmp.push(data[v]);
                    });

                    self.dataCached[finalurlHash] = JSON.stringify(tmp);
                    self.setProperty('data', tmp);


                } else {
                    self.dataCached[finalurlHash] = JSON.stringify(data);
                    self.setProperty('data', data);
                }


            } else {
                try {
                    delete self.dataCached[finalurlHash];
                } catch (e) {
                    //
                }
                self.setProperty('data', []);
            }

        }
    }

    /**
     * match all in string
     * @param string
     * @param regexp
     * @returns {any[]}
     */
    public matchAll = function (string, regexp) {

        var matches = [];
        if (typeof string !== 'string') {
            string = '';
        }

        string.replace(regexp, function () {
            var arr = ([]).slice.call(arguments, 0);
            var extras = arr.splice(-2);
            arr.index = extras[0];
            arr.input = extras[1];
            matches.push(arr);
        });
        return matches.length ? matches : null;


    };


    /**
     * Get options array as promise
     * @returns Observable<any>
     */
    public getOptions() {

        let self = this;


        return new Observable<any>((observer: Observer<any>) => {
            let o = observer;

            self.watch('data', (data) => {

                let options = [];

                let allOptions = {};


                data.forEach((item) => {

                    var v = self.mapping.value ? self.setHashedValue(self._getPropertyFromObject(item, self.mapping.value)) : self.setHashedValue(item);
                    allOptions[v] = true;
                    options.push({
                        value: v,
                        text: self._getPropertyFromObject(item, self.mapping.text),
                        disabled: self.mapping.disabled !== undefined ? self._getPropertyFromObject(item, self.mapping.disabled) : false,
                    })
                });

                self.setProperty('options', options);

                // remove non valid select options from current value
                if (Object.keys(allOptions).length && self.parent[self.parentProperty] !== undefined) {
                    var tmp = [];
                    self.parent[self.parentProperty].forEach((v) => {
                        if (allOptions[v] === true) {
                            tmp.push(v);
                        }
                    });
                    if (typeof self.parent.setProperty == 'function') {
                        self.parent.setProperty(self.parentProperty, tmp);
                    }
                }


                o.next(options);


            });
        });

    }

    /**
     * get property from object
     * @param inputObject
     * @param property
     */
    private _getPropertyFromObject(inputObject, property) {

        let self = this;

        if (typeof property == 'function') {
            return inputObject !== undefined ? property(inputObject) : null;
        }

        if (typeof property == 'string' && property.indexOf(".") > 0) {
            return self._getPropertyFromObject(inputObject[property.substr(0, property.indexOf("."))], property.substr(property.indexOf(".") + 1));
        } else {
            return inputObject[property];
        }


    };


}