import { AppsappInputAbstractComponent } from "../appsapp-input-abstract";
/**
 * Generated class for the AppsappInputTelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export declare class AppsappInputTelComponent extends AppsappInputAbstractComponent {
    prefix: string;
    ngAfterContentInit(): void;
    /**
     *
     * @param {ConfigModel} config
     */
    afterInit(config: any): void;
    /**
     *
     * @param model
     * @param property
     * @param value
     */
    beforeModelChanges(model: any, property: any, value: any): boolean;
}
