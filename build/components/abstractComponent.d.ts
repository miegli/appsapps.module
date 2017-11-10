import { Observer } from "rxjs/Observer";
import { Observable } from 'rxjs/Observable';
import { AppsappModuleProvider } from "../providers/appsapp-module-provider";
import { ConfigModel } from "../models/config";
export declare abstract class AbstractComponent {
    appFrameworkProvider: AppsappModuleProvider;
    stateObserver: Observer<any>;
    config: ConfigModel;
    constructor(appFrameworkProvider: AppsappModuleProvider);
    observer(): Observable<{}>;
    complete(): void;
}
