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
import {AppsappInputRatingComponent} from "./components/input/appsapp-input-rating/appsapp-input-rating";
import {AppsappInputBirthdayComponent} from "./components/input/appsapp-input-birthday/appsapp-input-birthday";
import {AppsappInputTextComponent} from "./components/input/appsapp-input-text/appsapp-input-text";
import {AppsappInputAbstractComponent} from "./components/input/appsapp-input-abstract";
import {MbscModule} from "@mobiscroll/angular";
import {FormsModule} from "@angular/forms";
import {AppsappModuleProvider} from "./providers/appsapp-module-provider";
import {AngularFireModule} from "angularfire2";
import {AppsappModuleProviderConfig} from "./providers/appsapp-module-provider";
import {AppsappModuleProviderMessages} from "./providers/appsapp-module-provider";
import {AppsappInputNumberPlainComponent} from "./components/input/appsapp-input-number-plain/appsapp-input-number-plain";

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
    AppsappInputAbstractComponent,
    AppsappInputNumberPlainComponent
  ],
  providers: [AppsappModuleProvider],
  imports: [MbscModule, CommonModule, FormsModule, AngularFireModule.initializeApp(
    {
      apiKey: "<your-key>",
      authDomain: "<your-project-authdomain>",
      databaseURL: "<your-database-URL>",
      projectId: "<your-project-id>",
      storageBucket: "<your-storage-bucket>",
      messagingSenderId: "<your-messaging-sender-id>"
    })],
  exports: [
    // export the component(s) that you want others to be able to use
    AppsappInputComponent
  ]
})


export class AppsappModule {
  static initializeApp(config: AppsappModuleProviderConfig, messages: AppsappModuleProviderMessages): ModuleWithProviders {
    return {
      ngModule: AppsappModule,
      providers: [AppsappModuleProvider, {provide: 'config', useValue: config}, {provide: 'messages', useValue: messages}]
    };
  }
}
