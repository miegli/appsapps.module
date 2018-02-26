import {PersistableModel} from "appsapp-cli";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";


export class SelectModel extends PersistableModel {

    private options: any = [];
    private data: any = [];
    private dataCached: any = {};
    private parent: any = null;
    private parentProperty: string = null;
    private url: string = '';
    private mapping: {
        text: string | Function,
        value?: string | Function,
        disabled?: boolean | Function,
        group?: string
    };
    private dataType: string = 'json';

    constructor() {

        super();

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
        let lastHash = null;
        let regex = /(\$\w+)[\/]*/g;


        var fetchdata = function (url, property?, data?) {

            var finalurl = url;


            if (self.parent && self.parent.getPropertyValue !== undefined) {



                if (self.matchAll(url, regex)) {
                    self.matchAll(url, regex).forEach((m) => {
                        finalurl = finalurl.replace(m[1], property == m[1].substr(1) ? data : self.parent[m[1].substr(1)]);
                    });
                }

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

                    var path = self.getFirebaseDatabaseSessionPath(finalurl);
                    self.update('data', []);

                    self.parent.getFirebaseDatabase().object(path).query.on('value', (event) => {

                        if (event) {
                            let data = event.val();

                            if (data) {
                                if (typeof data.forEach !== 'function') {
                                    var tmp = [];
                                    Object.keys(data).forEach((v) => {
                                        tmp.push(data[v]);
                                    });

                                    self.dataCached[finalurlHash] = JSON.stringify(tmp);
                                    self.update('data', tmp);


                                } else {

                                    self.dataCached[finalurlHash] = JSON.stringify(data);
                                    self.update('data', data);

                                }


                            }

                        }
                    });


                }

            }

        }


        if (self.matchAll(this.url, regex)) {
            if (self.parent && self.parent.getPropertyValue !== undefined) {
                self.matchAll(this.url, regex).forEach((m) => {
                    self.parent.watch(m[1].substr(1), (data) => {
                        self.options = [];
                        self.data = [];
                        fetchdata(self.url, m[1].substr(1), data);
                    });
                });
            }
        }

        fetchdata(this.url);


        return new Observable<any>((observer: Observer<any>) => {
            let o = observer;

            self.watch('data', (data) => {

                let options = [];
                let currentHash = self.setHashedValue(data);
                let allOptions = {};

                if (currentHash !== lastHash) {
                    data.forEach((item) => {

                        var v = self.mapping.value ? self.setHashedValue(self._getPropertyFromObject(item, self.mapping.value)) : self.setHashedValue(item);
                        allOptions[v] = true;
                        options.push({
                            value: v,
                            text: self._getPropertyFromObject(item, self.mapping.text),
                            disabled: self.mapping.disabled !== undefined ? self._getPropertyFromObject(item, self.mapping.disabled) : false,
                        })
                    });

                    self.update('options', options);

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
                }

                lastHash = currentHash;

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