import {Component, Output, ViewChild} from '@angular/core';
import {AppsappInputComponent} from "./appsapp-input/appsapp-input";
import {ConfigModel} from "../../models/config";
import {AppsappModuleProvider} from "../../providers/appsapp-module-provider";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

/**
 * Generated class for the AppsappInputAbstractComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    template: ''
})
export class AppsappInputAbstractComponent extends AppsappInputComponent {


    _name: string = '';
    _label: string = '';
    _description: string = '';
    _ngModelGettter: Observable<any>;
    _ngModelGettterObserver: Observer<any>;
    _validationMetadata: any = {};
    _options: any = {};
    _optionsTimeout: any = null;
    @Output() validator: Observable<any>;
    @Output() hidden: boolean = false;
    @Output() errormsg: string = '';
    @Output() placeholder: string = '';

    @ViewChild('mbscInstance') public mbsc;
    @ViewChild('mbscInstanceForm') public mbscForm;

    constructor(public appsappModuleProvider: AppsappModuleProvider) {

        super(appsappModuleProvider);


    }

    /**.
     * init with config model
     * @param {ConfigModel} config
     */
    public init(config?: ConfigModel) {

    }

    /**.
     * priviate init with config model
     * @param {ConfigModel} config
     */
    private _init(config?: ConfigModel) {


        let self = this;

        this._options['lang'] = this.appsappModuleProvider.getLang();

        if (this.property) {
            if (!this.validator) {
                this.validator = this.model.getValidation(this.property);
            }

            this._ngModelGettter = new Observable<any>((observer: Observer<any>) => {
                self._ngModelGettterObserver = observer;
                window.setTimeout(() => {
                    self._ngModelGettterObserver.next(self.model.getPropertyValue(self.property));
                    var p = self.model.getMetadataValue(self.property, 'hasPlaceholder')
                    self.placeholder = p ? p : '';
                }, 1);

            });
            this._ngModelGettter.share();

            self.model.watch(self.property, (value) => {
                if (self._ngModelGettterObserver !== undefined) {
                    self._ngModelGettterObserver.next(value);
                }
            });


        }


    }


    /**
     * get observable getter method
     * @returns {any}
     */
    get() {
        return this._ngModelGettter;
    }


    /**
     * set Mbsc Option
     * @param {Object} options
     */
    setMbscOption(options: any) {

        Object.keys(options).forEach((v) => {
            this._options[v] = options[v];
        });

        if (this.mbsc && this.mbsc.instance) {
            this.mbsc.instance.option(this._options);
        }


        // if (this.mbsc !== undefined && this.mbsc.instance) {
        //     if (this._optionsTimeout) {
        //         window.clearTimeout(this._optionsTimeout);
        //     }
        //     this._optionsTimeout = window.setTimeout(() => {
        //         this.mbsc.instance.option(this._options);
        //     },2)
        //
        // }

    }

    /**
     * event before model changes
     * @param model
     * @param property
     * @param value
     * @returns {boolean} false, then model changes will not be executed
     */
    beforeModelChanges(model, property, value) {
        return true;
    }

    /**
     * model changes event
     * @param event
     */
    modelChanges(event) {

        if (this.beforeModelChanges(this.model, this.property, event)) {
            this.model.setProperty(this.property, event);
        }

    }


    private _beforeinit() {


        this._validationMetadata = this.model.getMetadata(this.property);
        this._name = this.property;
        this._label = this.label ? this.label : (this.model.getMetadataValue(this.property, 'hasLabel') ? this.model.getMetadataValue(this.property, 'hasLabel') : (this._name ? this._name.toUpperCase() : ''));
        this._description = this.model.getMetadataValue(this.property, 'hasDescription');

        if (this.config) {

            let theme = 'material';

            if (this.config.getOs() == 'ios') {
                theme = 'ios';
            }

            if (this.config.getOs() == 'windows') {
                theme = 'wp';
            }

            if (this.config.getOs() == 'desktop') {
                theme = 'material';
            }

            let option = {
                theme: theme,
                closeOnOverlayTap: false
            };

            this.setMbscOption(option);


        }


    }


    /**
     * ngAfterViewInit
     */
    ngOnInit() {
        this._beforeinit();
        this._init(this.config);
    }

    /**
     * ngAfterViewInit
     */
    ngAfterViewInit() {
        this.init(this.config);


    }

    /**
     * update property of the main model and main property
     * @param property
     * @param newvalue
     * @returns {any}
     */
    update(value) {

        let self = this;

        if (this.model) {
            //window.setTimeout(function () {
                self.model.update(self.property, value).setProperty(self.property, value);
          //  }, 1);
            return this.model;
        } else {
            return null;
        }


    }


}
