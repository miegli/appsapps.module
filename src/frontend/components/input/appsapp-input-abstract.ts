import {Component, Output, ViewChild} from '@angular/core';
import {AppsappInputComponent} from "./appsapp-input/appsapp-input";
import {ConfigModel} from "../../models/config";
import {AppsappModuleProvider} from "../../providers/appsapp-module-provider";
import {Observable} from "rxjs/Observable";

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
    _labelPosition: string = '';
    _color: string = '';
    _description: string = '';
    _ngModelGettter: Observable<any>;
    _validationMetadata: any = {};
    _options: any = {};
    _hasErrors: boolean = false;
    @Output() validator: Observable<any>;
    @Output() errorStateMatcher = {
        isErrorState: () => {
            return this._hasErrors;
        }
    }
    @Output() hidden: boolean = false;
    @Output() clearable: boolean = false;
    @Output() errormsg: string = '';
    @Output() placeholder: string = '';
    @Output() description: string = '';


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
                this.validator.subscribe((next) => {
                    this._hasErrors = next ? true : false;
                })

            }

            var p = self.model.getMetadataValue(self.property, 'hasPlaceholder');
            this.placeholder = p ? p : '';

            var d = self.model.getMetadataValue(self.property, 'hasDescription');
            this.description = d ? d : '';

            if (self.model.getMetadataValue(self.property, 'hasClearable')) {
                this.clearable = true;
            }

            this._ngModelGettter = self.model.getProperty(self.property);

        }


    }

    /**
     * clear properties value
     */
    clear() {

        this.model.clear(this.property);
        console.log(this.property, this.model);

        return this;
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
        this._label = this.label ? this.label : (this.model.getMetadataValue(this.property, 'hasLabel') ? this.model.getMetadataValue(this.property, 'hasLabel').label : (this._name ? this._name.toUpperCase() : ''));
        this._labelPosition = this.model.getMetadataValue(this.property, 'hasLabel') ? this.model.getMetadataValue(this.property, 'hasLabel').labelPosition : 'after';
        this._description = this.model.getMetadataValue(this.property, 'hasDescription');
        this._color = this.model.getMetadataValue(this.property, 'hasColor');

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
            self.model.setProperty(self.property, value);
            return this.model;
        } else {
            return null;
        }


    }


}
