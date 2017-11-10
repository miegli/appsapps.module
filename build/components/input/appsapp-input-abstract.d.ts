import { AppsappInputComponent } from "./appsapp-input/appsapp-input";
import { ConfigModel } from "../../models/config";
import { AppsappModuleProvider } from "../../providers/appsapp-module-provider";
import { Observable } from "rxjs/Observable";
/**
 * Generated class for the AppsappInputAbstractComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export declare class AppsappInputAbstractComponent extends AppsappInputComponent {
    appsappModuleProvider: AppsappModuleProvider;
    _name: string;
    _label: string;
    _description: string;
    _ngModelGettter: Observable<any>;
    _validationMetadata: any;
    _config: ConfigModel;
    validator: Observable<any>;
    hidden: boolean;
    errormsg: string;
    mbsc: any;
    mbscForm: any;
    constructor(appsappModuleProvider: AppsappModuleProvider);
    /**
     * init with config model
     * @param {ConfigModel} config
     */
    init(config?: ConfigModel): void;
    /**
     * trigger befor init method
     */
    beforeInit(): void;
    /**
     * trigger after init method
     * @param {ConfigModel}
     */
    afterInit(options: ConfigModel): void;
    /**
     * get observable getter method
     * @returns {any}
     */
    get(): Observable<any>;
    /**
     * set Mbsc Option
     * @param {Object} options
     */
    setMbscOption(option: any): void;
    /**
     * event before model changes
     * @param model
     * @param property
     * @param value
     * @returns {boolean} false, then model changes will not be executed
     */
    beforeModelChanges(model: any, property: any, value: any): boolean;
    /**
     * call after constructor
     */
    afterConstructor(): void;
    /**
     * model changes event
     * @param event
     */
    modelChanges(event: any): void;
    ngOnInit(): void;
    /**
     * ngAfterViewInit
     */
    ngAfterViewInit(): void;
}
