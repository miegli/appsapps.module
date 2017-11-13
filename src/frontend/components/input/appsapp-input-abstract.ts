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
    _validationMetadata: any = {};
    _config: ConfigModel;
    @Output() validator: Observable<any>;
    @Output() hidden: boolean = false;
    @Output() errormsg: string = '';


    @ViewChild('mbscInstance') public mbsc;
    @ViewChild('mbscInstanceForm') public mbscForm;

    constructor(public appsappModuleProvider: AppsappModuleProvider) {

        super(appsappModuleProvider);
        this.init();

    }

    /**
     * init with config model
     * @param {ConfigModel} config
     */
    init(config?: ConfigModel) {


        if (this.property) {
            if (!this.validator) {
                this.validator = this.model.getValidation(this.property);
            }
            if (!this._ngModelGettter) {
                this._ngModelGettter = this.model.getProperty(this.property);
            }
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
                lang: 'de'
            };

            if (this.mbsc) {
                this.mbsc.instance.option(option);
            }
            if (this.mbscForm) {
                this.mbscForm.instance.option(option);
            }


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
    setMbscOption(option: any) {

        if (this.mbsc !== undefined) {
            this.mbsc.instance.option(option);
        }

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


}
