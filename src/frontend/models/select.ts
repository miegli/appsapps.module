import {PersistableModel} from "appsapp-cli";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";


export class SelectModel extends PersistableModel {

    private options: any = [];
    private data: any = [];
    private url: string = '';
    private mapping: {
        text: string,
        value: string,
        group?: string
    };
    private dataType: string = 'json';


    constructor() {

        super();

    }


    /**
     * Get options array as promise
     * @returns Observable<any>
     */
    public getOptions() {

        let self = this;


        this.getHttpClient().get(this.url).subscribe((data) => {
            self.update('data', data);
        }, (error) => {
            // skip error
        });


        return new Observable<any>((observer: Observer<any>) => {
            let o = observer;
            self.getProperty('data').subscribe((data) => {

                let options = [];

                data.forEach((item) => {
                    options.push({
                        value: self._getPropertyFromObject(item, self.mapping.value),
                        text: self._getPropertyFromObject(item, self.mapping.text)
                    })
                });

                self.update('options', options).saveWithPromise().then(() => {
                    //
                }).catch((e) => {
                    console.log(e);
                });

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
            return property(inputObject);
        }

        if (property.indexOf(".") > 0) {
            return self._getPropertyFromObject(inputObject[property.substr(0, property.indexOf("."))], property.substr(property.indexOf(".") + 1));
        } else {
            return inputObject[property];
        }


    };


}