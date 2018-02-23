import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AppsappInputComponent} from "./components/input/appsapp-input/appsapp-input";
import {AppsappInputUrlComponent} from "./components/input/appsapp-input-url/appsapp-input-url";
import {AppsappInputNumberComponent} from "./components/input/appsapp-input-number/appsapp-input-number";
import {AppsappInputTextareaComponent} from "./components/input/appsapp-input-textarea/appsapp-input-textarea";
import {AppsappInputTelComponent} from "./components/input/appsapp-input-tel/appsapp-input-tel";
import {AppsappInputEmailComponent} from "./components/input/appsapp-input-email/appsapp-input-email";
import {AppsappInputDatesComponent} from "./components/input/appsapp-input-dates/appsapp-input-dates";
import {AppsappInputDateComponent} from "./components/input/appsapp-input-date/appsapp-input-date";
import {AppsappInputPasswordComponent} from "./components/input/appsapp-input-password/appsapp-input-password";
import {AppsappInputIntegerComponent} from "./components/input/appsapp-input-integer/appsapp-input-integer";
import {AppsappInputBooleanComponent} from "./components/input/appsapp-input-boolean/appsapp-input-boolean";
import {AppsappInputBirthdayComponent} from "./components/input/appsapp-input-birthday/appsapp-input-birthday";
import {AppsappInputTextComponent} from "./components/input/appsapp-input-text/appsapp-input-text";
import {AppsappInputSelectComponent} from "./components/input/appsapp-input-select/appsapp-input-select";
import {AppsappInputListComponent} from "./components/input/appsapp-input-list/appsapp-input-list";
import {AppsappInputTimeComponent} from "./components/input/appsapp-input-time/appsapp-input-time";
import {AppsappInputAbstractComponent} from "./components/input/appsapp-input-abstract";
import {MbscModule} from "@mobiscroll/angular";
import {FormsModule} from "@angular/forms";
import {AppsappModuleProvider} from "./providers/appsapp-module-provider";
import {AppsappModuleProviderConfig} from "./providers/appsapp-module-provider";
import {AppsappModuleProviderMessages} from "appsapp-cli";
import {AppsappInputNumberPlainComponent} from "./components/input/appsapp-input-number-plain/appsapp-input-number-plain";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {AppsappNavigationComponent} from "./components/navigation/appsapp-navigation/appsapp-navigation";

@NgModule({
    declarations: [
        // declare all components that your module uses
        AppsappInputComponent,
        AppsappInputUrlComponent,
        AppsappInputNumberComponent,
        AppsappInputTextareaComponent,
        AppsappInputTelComponent,
        AppsappInputEmailComponent,
        AppsappInputDatesComponent,
        AppsappInputDateComponent,
        AppsappInputPasswordComponent,
        AppsappInputIntegerComponent,
        AppsappInputBooleanComponent,
        AppsappInputBirthdayComponent,
        AppsappInputTextComponent,
        AppsappInputAbstractComponent,
        AppsappInputSelectComponent,
        AppsappInputListComponent,
        AppsappInputNumberPlainComponent,
        AppsappInputTimeComponent,
        AppsappNavigationComponent
    ],
    providers: [AppsappModuleProvider, HttpClient],
    imports: [MbscModule, CommonModule, FormsModule, HttpClientModule],
    exports: [
        // export the component(s) that you want others to be able to use
        AppsappInputComponent,
        AppsappNavigationComponent
    ],
    entryComponents: [

    ]
})


export class AppsappModule {
    static initializeApp(config: AppsappModuleProviderConfig, messages: AppsappModuleProviderMessages): ModuleWithProviders {
        return {
            ngModule: AppsappModule,
            providers: [AppsappModuleProvider, {provide: 'config', useValue: config}, {
                provide: 'messages',
                useValue: messages
            }]
        };
    }
}

