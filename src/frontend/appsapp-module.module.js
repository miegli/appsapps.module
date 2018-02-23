"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var appsapp_input_1 = require("./components/input/appsapp-input/appsapp-input");
var appsapp_input_url_1 = require("./components/input/appsapp-input-url/appsapp-input-url");
var appsapp_input_number_1 = require("./components/input/appsapp-input-number/appsapp-input-number");
var appsapp_input_textarea_1 = require("./components/input/appsapp-input-textarea/appsapp-input-textarea");
var appsapp_input_tel_1 = require("./components/input/appsapp-input-tel/appsapp-input-tel");
var appsapp_input_email_1 = require("./components/input/appsapp-input-email/appsapp-input-email");
var appsapp_input_dates_1 = require("./components/input/appsapp-input-dates/appsapp-input-dates");
var appsapp_input_date_1 = require("./components/input/appsapp-input-date/appsapp-input-date");
var appsapp_input_password_1 = require("./components/input/appsapp-input-password/appsapp-input-password");
var appsapp_input_integer_1 = require("./components/input/appsapp-input-integer/appsapp-input-integer");
var appsapp_input_boolean_1 = require("./components/input/appsapp-input-boolean/appsapp-input-boolean");
var appsapp_input_birthday_1 = require("./components/input/appsapp-input-birthday/appsapp-input-birthday");
var appsapp_input_text_1 = require("./components/input/appsapp-input-text/appsapp-input-text");
var appsapp_input_select_1 = require("./components/input/appsapp-input-select/appsapp-input-select");
var appsapp_input_list_1 = require("./components/input/appsapp-input-list/appsapp-input-list");
var appsapp_input_time_1 = require("./components/input/appsapp-input-time/appsapp-input-time");
var appsapp_input_abstract_1 = require("./components/input/appsapp-input-abstract");
var angular_1 = require("@mobiscroll/angular");
var forms_1 = require("@angular/forms");
var appsapp_module_provider_1 = require("./providers/appsapp-module-provider");
var appsapp_input_number_plain_1 = require("./components/input/appsapp-input-number-plain/appsapp-input-number-plain");
var http_1 = require("@angular/common/http");
var appsapp_navigation_1 = require("./components/navigation/appsapp-navigation/appsapp-navigation");
var AppsappModule = /** @class */ (function () {
    function AppsappModule() {
    }
    AppsappModule_1 = AppsappModule;
    AppsappModule.initializeApp = function (config, messages) {
        return {
            ngModule: AppsappModule_1,
            providers: [appsapp_module_provider_1.AppsappModuleProvider, { provide: 'config', useValue: config }, {
                    provide: 'messages',
                    useValue: messages
                }]
        };
    };
    AppsappModule = AppsappModule_1 = __decorate([
        core_1.NgModule({
            declarations: [
                // declare all components that your module uses
                appsapp_input_1.AppsappInputComponent,
                appsapp_input_url_1.AppsappInputUrlComponent,
                appsapp_input_number_1.AppsappInputNumberComponent,
                appsapp_input_textarea_1.AppsappInputTextareaComponent,
                appsapp_input_tel_1.AppsappInputTelComponent,
                appsapp_input_email_1.AppsappInputEmailComponent,
                appsapp_input_dates_1.AppsappInputDatesComponent,
                appsapp_input_date_1.AppsappInputDateComponent,
                appsapp_input_password_1.AppsappInputPasswordComponent,
                appsapp_input_integer_1.AppsappInputIntegerComponent,
                appsapp_input_boolean_1.AppsappInputBooleanComponent,
                appsapp_input_birthday_1.AppsappInputBirthdayComponent,
                appsapp_input_text_1.AppsappInputTextComponent,
                appsapp_input_abstract_1.AppsappInputAbstractComponent,
                appsapp_input_select_1.AppsappInputSelectComponent,
                appsapp_input_list_1.AppsappInputListComponent,
                appsapp_input_number_plain_1.AppsappInputNumberPlainComponent,
                appsapp_input_time_1.AppsappInputTimeComponent,
                appsapp_navigation_1.AppsappNavigationComponent
            ],
            providers: [appsapp_module_provider_1.AppsappModuleProvider, http_1.HttpClient],
            imports: [angular_1.MbscModule, common_1.CommonModule, forms_1.FormsModule, http_1.HttpClientModule],
            exports: [
                // export the component(s) that you want others to be able to use
                appsapp_input_1.AppsappInputComponent,
                appsapp_navigation_1.AppsappNavigationComponent
            ],
            entryComponents: []
        })
    ], AppsappModule);
    return AppsappModule;
    var AppsappModule_1;
}());
exports.AppsappModule = AppsappModule;
