//var home = require('./dist/pages/home/home');
//var home = require('/Users/pamegli/Documents/projects/appsapp.myApp/myApp/dist/pages/home/home');
var classValidator = require("class-validator");
const persistable_1 = require('./models/persistable');
const class_validator_1 = classValidator;
const base64 = require('base-64');

var serviceAccount = require("/Users/pamegli/Documents/projects/appsapp.myApp/myApp/serviceAccountKey.json");

var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://" + serviceAccount.project_id + ".firebaseio.com"
});



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



let m = "dmFyIFRlc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7CiAgICBfX2V4dGVuZHMoVGVzdCwgX3N1cGVyKTsKICAgIGZ1bmN0aW9uIFRlc3QoKSB7CiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7CiAgICAgICAgX3RoaXMuYW5yZWRlID0gJyc7CiAgICAgICAgcmV0dXJuIF90aGlzOwogICAgICAgIC8vIEBJc1N0cmluZygpIG5hbWU6IHN0cmluZyA9ICcnOwogICAgICAgIC8vIEBJc1N0cmluZygpIHZvcm5hbWU6IHN0cmluZyA9ICcnOwogICAgICAgIC8vIEBJc1N0cmluZygpIHN0cmFzc2U6IHN0cmluZyA9ICcnOwogICAgICAgIC8vIEBJc1N0cmluZygpIEBNYXhMZW5ndGgoMykgQE1hdGNoZXMoLy4/WzAtOV0uPy8pIHN0cmFzc2VOcjogc3RyaW5nID0gJyc7CiAgICAgICAgLy8gQElzSW50KCkgQE1pbigxMDAwKSBATWF4KDk2OTkpIHBsejogbnVtYmVyOwogICAgICAgIC8vIEBJc1N0cmluZygpIG9ydDogc3RyaW5nID0gJyc7CiAgICAgICAgLy8gQElzQmlydGhEYXRlKCkgZ2VidXJ0c2RhdHVtOiBEYXRlOwogICAgICAgIC8vIEBJc1Bob25lTnVtYmVyKCcrNDEnKSB0ZWxlZm9uOiBzdHJpbmc7CiAgICAgICAgLy8gQElzSW50KCkgQE1pbigyKSBATWF4KDUpIEBIYXNMYWJlbCgnQW56YWhsIEhhdXN0aWVyZScpIGFuemFobGhhdXN0aWVyZTogbnVtYmVyOwogICAgICAgIC8vIEBJc0ludCgpIGFuemFobGtpbmRlcjogbnVtYmVyOwogICAgICAgIC8vIEBJc1RleHQoMzIpIEBNaW5MZW5ndGgoMTApIHRleHQ6IHN0cmluZyA9ICcnOwogICAgICAgIC8vIEBIYXNQcmVjaXNpb24oMSkgQElzTnVtcGFkKCkgQE1pbigxMCkgQE1heCgxNSkgbGllYmxpbmdzemFobDogbnVtYmVyID0gMTsKICAgICAgICAvLyBASXNSYXRpbmcoKSBASGFzRGVzY3JpcHRpb24oJ0locmUgU3RpbW1lIHrkaGx0JykgcmF0aW5nOiBzdHJpbmc7CiAgICAgICAgLy8gQElzRGF0ZVJhbmdlKCkgdm9uYmlzOiBvYmplY3Q7CiAgICAgICAgLy8gQElzQ2FsZW5kYXIoKSBrYWxlbmRlcjogRGF0ZTsKICAgICAgICAvLyBASGFzQ29uZGl0aW9ucyhbe3Byb3BlcnR5OiAncGx6JywgdmFsdWU6IDYwMDB9XSkgQEhhc0xhYmVsKCdMYW5kJykgbGFuZDogc3RyaW5nID0gJ3NjaHdlaXonOwogICAgICAgIC8vIEBIYXNDb25kaXRpb25zKFt7cHJvcGVydHk6ICdsYW5kJywgdmFsdWU6ICdzY2h3ZWl6J31dKSBASXNQYXNzd29yZCgpIHBhc3N3b3J0OiBzdHJpbmc7CiAgICB9CiAgICBfX2RlY29yYXRlKFsKICAgICAgICBjbGFzc192YWxpZGF0b3JfMS5Jc1N0cmluZygpLCBjbGFzc192YWxpZGF0b3JfMS5MZW5ndGgoMiwgMyksCiAgICAgICAgX19tZXRhZGF0YSgiZGVzaWduOnR5cGUiLCBTdHJpbmcpCiAgICBdLCBUZXN0LnByb3RvdHlwZSwgImFucmVkZSIpOwogICAgcmV0dXJuIFRlc3Q7Cn0ocGVyc2lzdGFibGVfMS5QZXJzaXN0YWJsZU1vZGVsKSk7";

createNewModelFromBase64String = function(base64string, classname) {

  eval(base64.decode(base64string));
  return new global[classname];


}

admin.database().ref('_config/Test').once('value', (snapshot) => {
  "use strict";

  let config = snapshot.val();

  eval(base64.decode(config.constructor));


console.log(global['Test']);

});

//
// let m = "\"if (Test == undefined) {\\nvar Test = /** @class */ (function (_super) {\\n    __extends(Test, _super);\\n    function Test() {\\n        var _this = _super !== null && _super.apply(this, arguments) || this;\\n        _this.anrede = '';\\n        return _this;\\n        // @IsString() name: string = '';\\n        // @IsString() vorname: string = '';\\n        // @IsString() strasse: string = '';\\n        // @IsString() @MaxLength(3) @Matches(/.?[0-9].?/) strasseNr: string = '';\\n        // @IsInt() @Min(1000) @Max(9699) plz: number;\\n        // @IsString() ort: string = '';\\n        // @IsBirthDate() geburtsdatum: Date;\\n        // @IsPhoneNumber('+41') telefon: string;\\n        // @IsInt() @Min(2) @Max(5) @HasLabel('Anzahl Haustiere') anzahlhaustiere: number;\\n        // @IsInt() anzahlkinder: number;\\n        // @IsText(32) @MinLength(10) text: string = '';\\n        // @HasPrecision(1) @IsNumpad() @Min(10) @Max(15) lieblingszahl: number = 1;\\n        // @IsRating() @HasDescription('Ihre Stimme zählt') rating: string;\\n        // @IsDateRange() vonbis: object;\\n        // @IsCalendar() kalender: Date;\\n        // @HasConditions([{property: 'plz', value: 6000}]) @HasLabel('Land') land: string = 'schweiz';\\n        // @HasConditions([{property: 'land', value: 'schweiz'}]) @IsPassword() passwort: string;\\n    }\\n    __decorate([\\n        class_validator_1.IsString(), class_validator_1.Length(2, 3),\\n        __metadata(\\\"design:type\\\", String)\\n    ], Test.prototype, \\\"anrede\\\");\\n    return Test;\\n}(persistable_1.PersistableModel));\\n }\"";
//
// console.log(JSON.parse(m));
// eval(JSON.parse(m));
// let t = 'Test';
//
// eval('var model = new '+t+'();');

//console.log(model);

// let t = new Test();
//
// t.validate().then(() => {
//   "use strict";
//   console.log(1);
// }).catch((e) => {
//   "use strict";
//   console.log(e);
// })
