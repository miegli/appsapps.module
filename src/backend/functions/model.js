//var home = require('./dist/pages/home/home');
//var home = require('/Users/pamegli/Documents/projects/appsapp.myApp/myApp/dist/pages/home/home');
var classValidator = require("class-validator");
var appsappModule = require("appsapp-module");
const persistable_1 = appsappModule;
const class_validator_1 = classValidator;



let m = `
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
  
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anrede = '';
        return _this;
        // @IsString() name: string = '';
        // @IsString() vorname: string = '';
        // @IsString() strasse: string = '';
        // @IsString() @MaxLength(3) @Matches(/.?[0-9].?/) strasseNr: string = '';
        // @IsInt() @Min(1000) @Max(9699) plz: number;
        // @IsString() ort: string = '';
        // @IsBirthDate() geburtsdatum: Date;
        // @IsPhoneNumber('+41') telefon: string;
        // @IsInt() @Min(2) @Max(5) @HasLabel('Anzahl Haustiere') anzahlhaustiere: number;
        // @IsInt() anzahlkinder: number;
        // @IsText(32) @MinLength(10) text: string = '';
        // @HasPrecision(1) @IsNumpad() @Min(10) @Max(15) lieblingszahl: number = 1;
        // @IsRating() @HasDescription('Ihre Stimme zählt') rating: string;
        // @IsDateRange() vonbis: object;
        // @IsCalendar() kalender: Date;
        // @HasConditions([{property: 'plz', value: 6000}]) @HasLabel('Land') land: string = 'schweiz';
        // @HasConditions([{property: 'land', value: 'schweiz'}]) @IsPassword() passwort: string;
    }
    __decorate([
        class_validator_1.IsString(), class_validator_1.Length(2, 3),
        __metadata("design:type", String)
    ], Test.prototype, "anrede");
    return Test;
}(persistable_1.PersistableModel));
`


eval(m);



let t = new Test();

t.validate().then(() => {
  "use strict";
  console.log(1);
}).catch((e) => {
  "use strict";
  console.log(e);
})
