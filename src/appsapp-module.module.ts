import {Observable} from 'rxjs';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AppsappModuleProvider} from "./providers/appsapp-module-provider";
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
import {AppsappInputRatingComponent} from "./components/input/appsapp-input-rating/appsapp-input-rating";
import {AppsappInputBirthdayComponent} from "./components/input/appsapp-input-birthday/appsapp-input-birthday";
import {AppsappInputTextComponent} from "./components/input/appsapp-input-text/appsapp-input-text";
import {AppsappInputAbstractComponent} from "./components/input/appsapp-input-abstract";
import {MbscModule} from "@mobiscroll/angular";
import {FormsModule} from "../node_modules/@mobiscroll/angular/node_modules/@angular/forms/src/form_providers";

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
        AppsappInputRatingComponent,
        AppsappInputBirthdayComponent,
        AppsappInputTextComponent,
        AppsappInputAbstractComponent
    ],
    imports: [MbscModule, FormsModule, CommonModule],
    exports: [
        // export the component(s) that you want others to be able to use
        AppsappInputComponent
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

