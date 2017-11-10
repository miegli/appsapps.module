import { AppsappInputAbstractComponent } from "../appsapp-input-abstract";
/**
 * Generated class for the AppsappInputDatesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export declare class AppsappInputDatesComponent extends AppsappInputAbstractComponent {
    range: Array<Date>;
    locked: boolean;
    /**
     *
     * @param {ConfigModel} config
     */
    afterInit(config: any): void;
    beforeModelChanges(model: any, property: any, value: any): boolean;
}
