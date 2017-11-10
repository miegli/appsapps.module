import { AppsappInputAbstractComponent } from "../appsapp-input-abstract";
/**
 * Generated class for the AppsappInputNumberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export declare class AppsappInputRatingComponent extends AppsappInputAbstractComponent {
    rating: any;
    locked: boolean;
    isInline: boolean;
    __label: string;
    modelChanges(event: any): void;
    /**
     *
     * @param {ConfigModel} config
     */
    afterInit(config: any): void;
    beforeModelChanges(model: any, property: any, value: any): boolean;
}
