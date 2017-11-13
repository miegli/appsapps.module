import {Observer} from "rxjs/Observer";
import {Observable} from 'rxjs/Observable';
import {AppsappModuleProvider} from "../providers/appsapp-module-provider";
import {ConfigModel} from "../models/config";

export abstract class AbstractComponent {

  public stateObserver:Observer<any>;
  public config: ConfigModel;

  constructor(public appFrameworkProvider: AppsappModuleProvider) {

   if (appFrameworkProvider) {
     this.config = appFrameworkProvider.config;
   }

  }

  public observer() {

    return new Observable((observer) => {
      this.stateObserver = observer;
    });

  }

  public complete() {
    if (this.stateObserver) {
      this.stateObserver.complete();
    }
  }

}
