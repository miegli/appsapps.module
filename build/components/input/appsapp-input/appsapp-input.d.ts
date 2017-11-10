import { AbstractComponent } from "../../abstractComponent";
import { AppsappModuleProvider } from "../../../providers/appsapp-module-provider";
/**
 * Generate d class for the AppsappInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export declare class AppsappInputComponent extends AbstractComponent {
    appsappModuleProvider: AppsappModuleProvider;
    property: any;
    model: any;
    label: string;
    options: any;
    _inputs: any;
    hidden: boolean;
    constructor(appsappModuleProvider: AppsappModuleProvider);
    ngOnInit(): void;
    /**
     * get is hidden from condition action
     * @param condition
     * @returns {boolean}
     */
    isHidden(condition: any): boolean;
}
