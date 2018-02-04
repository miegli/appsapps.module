import {PersistableModel} from "appsapp-cli";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";


export class SelectModel extends PersistableModel {

    private options: any = [];
    private data: any = [];
    private parent: any = null;
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


        var fetchdata = function (url) {

            console.log(1, url);

            if (self.matchAll(url, regex)) {
                self.matchAll(url, regex).forEach((m) => {
                    url = url.replace(m[1], self.parent.getPropertyValue(m[1].substr(1)));
                });
            }

            console.log(2, url);

            if (url.substr(0, 4) == 'http') {
                this.getHttpClient().get(url).subscribe((data) => {
                    self.update('data', data);
                }, (error) => {
                    // skip error
                });
            }
            if (url.substr(0, 1) == '/') {
                self.getFirebaseData(url).subscribe((event) => {
                    if (event) {

                        let data = event.payload.val();

                        if (data) {

                            if (typeof data.forEach !== 'function') {
                                var tmp = [];
                                Object.keys(data).forEach((v) => {
                                    tmp.push(data[v]);
                                });

                                self.update('data', tmp);
                            } else {

                                self.update('data', data);
                            }

                        }


                    }

                });
            }
        }


        if (self.matchAll(this.url, regex)) {
            self.matchAll(this.url, regex).forEach((m) => {
                self.parent.watch(m[1].substr(1), (data) => {
                    fetchdata(self.url);

                });
            });
        } else {
            fetchdata(this.url);
        }


        return new Observable<any>((observer: Observer<any>) => {
            let o = observer;
            self.getProperty('data').subscribe((data) => {

                let options = [];
                let currentHash = self.setHashedValue(data);

                if (currentHash !== lastHash) {
                    data.forEach((item) => {

                        options.push({
                            value: self.mapping.value ? self.setHashedValue(self._getPropertyFromObject(item, self.mapping.value)) : self.setHashedValue(item),
                            text: self._getPropertyFromObject(item, self.mapping.text),
                            disabled: self.mapping.disabled !== undefined ? self._getPropertyFromObject(item, self.mapping.disabled) : false,
                        })
                    });

                    self.update('options', options).saveWithPromise().then(() => {
                        //
                    }).catch((e) => {
                        console.log(e);
                    });

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