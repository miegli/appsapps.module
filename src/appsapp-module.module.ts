import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppsappModuleProvider} from "./providers/appsapp-module-provider";

@NgModule({
  declarations: [
    // declare all components that your module uses
  ],
  exports: [
    // export the component(s) that you want others to be able to use
  ]
})
export class AppsappModule {
    static initializeApp(config: {
        apiKey: string,
        projectId: string
    }): ModuleWithProviders {

        return {
            ngModule: AppsappModule,
            providers: [AppsappModuleProvider, {provide: 'config', useValue: config}]
        };
    }
}

