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
    private __dataTmpValues = {};
    private __optionObserver;

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

        self.parent.watch(self.parentProperty, (value) => {
            if (value && value.length) {
                self.__dataTmpValues[self.__currentUrl] = value;
            }
        });


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


                if (finalurl.substr(0, 4) == 'http') {
                    this.getHttpClient().get(finalurl).subscribe((data) => {
                        self.dataCached[finalurlHash] = JSON.stringify(data);
                        self.setProperty('data', data);
                    }, (error) => {
                        // skip error
                    });
                }
                if (finalurl.substr(0, 1) == '/') {


                    if (self.parent instanceof PersistableModel) {

                        self.loaded().then(() => {

                            if (self.parent) {
                                var path = self.getFirebaseDatabaseSessionPath(finalurl);

                                self.setProperty('data', []);

                                this.__updateFromLocalStorage(finalurlHash);

                                if (self.__registeredUrls[finalurl] === undefined) {
                                    self.__registeredUrls[finalurl] = path;
                                    if (self.parent.getFirebaseDatabase() !== undefined) {
                                        self.parent.getFirebaseDatabase().object(path).query.on('value', (event) => {
                                            self.updateFromFirebase(event, finalurlHash);
                                        });
                                    }
                                } else {
                                    if (self.parent.getFirebaseDatabase() !== undefined) {
                                        self.parent.getFirebaseDatabase().object(path).query.once('value', (event) => {
                                            self.updateFromFirebase(event, finalurlHash);
                                        });
                                    }
                                }
                            }

                        });


                    }


                }
            } else {
                self.setProperty('data', []);
            }

        }


    }


    private __updateFromLocalStorage(finalurlHash) {

        if (this.dataCached[finalurlHash] !== undefined) {
            this.setProperty('data', JSON.parse(this.dataCached[finalurlHash]));
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
            self.__optionObserver = observer;
            self.loaded().then(() => {
                self.parent.loaded().then(() => {
                    self.watch('data', (data) => {
                        self.applyData(data);
                    });
                });
            });
        });

    }

    private applyData(data) {

        let self = this;

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

        // reset temp values
        if (self.parent[self.parentProperty] !== undefined && self.parent[self.parentProperty].length == 0 && self.__dataTmpValues[self.__currentUrl]) {
            self.parent.setProperty(self.parentProperty, self.__dataTmpValues[self.__currentUrl]);
        }

        // remove non valid select options from current value
        if (self.parent instanceof PersistableModel) {
            if (Object.keys(allOptions).length && self.parent[self.parentProperty] !== undefined) {
                var tmp = [];
                self.parent[self.parentProperty].forEach((v) => {
                    if (allOptions[v] === true) {
                        tmp.push(v);
                    }
                });
                self.parent.setProperty(self.parentProperty, tmp);
            } else {
                if (self.parent[self.parentProperty] !== undefined) {
                    self.parent.setProperty(self.parentProperty, []);
                }
            }
        }

        if (self.__optionObserver) {
            self.__optionObserver.next(options);
        }


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