import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BrowserModule} from '@angular/platform-browser';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {FormsModule} from "@angular/forms";
import {AppsappModuleProvider} from "./providers/appsapp-module-provider";
import {AppsappModuleProviderConfig} from "./providers/appsapp-module-provider";
import {AppsappModuleProviderMessages} from "appsapp-cli";
import {AppsappInputNumberPlainComponent} from "./components/input/appsapp-input-number-plain/appsapp-input-number-plain";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {AppsappNavigationComponent} from "./components/navigation/appsapp-navigation/appsapp-navigation";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatDatepickerModule, MatCardModule, MatButtonToggleModule, MatAutocompleteModule, MatChipsModule, MatCommonModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatLineModule, MatListModule, MatMenuModule, MatNativeDateModule,
 MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatPseudoCheckboxModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, NativeDateModule} from '@angular/material';

import './polyfills';

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
    providers: [AppsappModuleProvider, HttpClient, // The locale would typically be provided on the root module of your application. We do it at
        // the component level here, due to limitations of our example generation script.
        {provide: MAT_DATE_LOCALE, useValue: 'de-CH'},

        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},],
    imports: [BrowserModule,
        BrowserAnimationsModule,CommonModule, NoopAnimationsModule, FormsModule, HttpClientModule, MatButtonModule, MatCheckboxModule,MatDatepickerModule, MatCardModule, MatButtonToggleModule, MatAutocompleteModule, MatChipsModule, MatCommonModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatLineModule, MatListModule, MatMenuModule, MatNativeDateModule,
        MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatPseudoCheckboxModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, NativeDateModule],
    exports: [
        // export the component(s) that you want others to be able to use
        AppsappInputComponent,
        AppsappNavigationComponent,
        MatButtonModule, MatCheckboxModule,MatDatepickerModule, MatCardModule, MatButtonToggleModule, MatAutocompleteModule, MatChipsModule, MatCommonModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatLineModule, MatListModule, MatMenuModule, MatNativeDateModule,
        MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatPseudoCheckboxModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, NativeDateModule
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

