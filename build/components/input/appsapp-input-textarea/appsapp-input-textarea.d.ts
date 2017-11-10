import { AppsappInputAbstractComponent } from "../appsapp-input-abstract";
/**
 * Generated class for the AppsappInputTextareaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export declare class AppsappInputTextareaComponent extends AppsappInputAbstractComponent {
    maxLength: number;
    currentLength: number;
    label: string;
    /**
     *
     * @param {ConfigModel} config
     */
    afterInit(config: any): void;
    /**
     * event before model changes
     * @param model
     * @param property
     * @param value
     * @returns {boolean} false, then model changes will not be executed
     */
    beforeModelChanges(model: any, property: any, value: any): boolean;
}
