import {Component, Output, ViewChild} from '@angular/core';
import {AppsappInputComponent} from "./appsapp-input/appsapp-input";
import {ConfigModel} from "../../models/config";
import {AppsappModuleProvider} from "../../providers/appsapp-module-provider";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {NgZone} from '@angular/core';

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
    _config: ConfigModel;
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

        this.init();

    }


    /**.
     * init with config model
     * @param {ConfigModel} config
     */
    init(config?: ConfigModel) {

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
                    self.placeholder =  p ? p : '';
                },1);

            });
            this._ngModelGettter.share();

            self.model.watch(self.property, (value) => {
                if (self._ngModelGettterObserver !== undefined) {
                    self._ngModelGettterObserver.next(value);
                }
            });



        }


        if (config) {

            let theme = 'material';

            if (config.getOs() == 'ios') {
                theme = 'ios';
            }

            if (config.getOs() == 'windows') {
                theme = 'wp';
            }

            if (config.getOs() == 'desktop') {
                theme = 'material';
            }


            let option = {
                theme: theme,
                closeOnOverlayTap: false
            };

            this.setMbscOption(option);

            this.afterInit(config);
            this._config = config;

        }


    }

    /**
     * trigger befor init method
     */
    beforeInit() {


    }

    /**
     * trigger after init method
     * @param {ConfigModel}
     */
    afterInit(options: ConfigModel) {


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
     * call after constructor
     */
    afterConstructor() {


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


    ngOnInit() {

        let self = this;

        this.afterConstructor();

        this._validationMetadata = this.model.getMetadata(this.property);
        this._name = this.property;
        this._label = this.label ? this.label : (this.model.getMetadataValue(this.property, 'hasLabel') ? this.model.getMetadataValue(this.property, 'hasLabel') : (this._name ? this._name.toUpperCase() : ''));
        this._description = this.model.getMetadataValue(this.property, 'hasDescription');


    }


    /**
     * ngAfterViewInit
     */
    ngAfterViewInit() {

        let self = this;


        if (this.config) {
            this.config.getObservable().subscribe((config) => {
                this.beforeInit();
                this.init(config);
            });
        }


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
            window.setTimeout(function () {
                //self._ngModelGettter = self.model.update(self.property, value).setProperty(self.property, value).getProperty(self.property);
                self.model.update(self.property, value).setProperty(self.property, value);
            }, 1);
            return this.model;
        } else {
            return null;
        }


    }


}
