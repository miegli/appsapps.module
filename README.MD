# appsapp-module for Ionicframework

**Attention: Don't use it in production environment. It's an alpha version for a concept study.** 

This is an appsApp collection of high quality ui components with awesome backend and validation services full included. Now you build super sophisticated Angular/Ionic apps using TypeScript.

Circular condition validators (frontend and backend all-in-one!) are the unique selling points. You gonna love it!
 
![Alt text](appsapp-module-screen.png?raw=true "appsApp.io")


## Install

You need `mobiscroll`. Please obtain a licence (see https://www.mobiscroll.com/) and then run:

```bash
$ npm install -g @mobiscroll/cli
```

You also need `apppsapp-cli`. So please install it by running:

```bash
$ npm install -g appsapp-cli
```

Once you have kick-started your ionic app, you have to import `appsapp-module` and append `mobiscroll`. Switch to your apps project root and run:


```bash
$ mobiscroll config ionic
$ npm install appsapp-module --save
```

and then add `appsapp-module` to your Angular `app.module.ts`

```typescript
import { AppsappModule } from 'appsapp-module';

@NgModule({
  imports: [
    AppsappModule.initializeApp({
      apiKey: 'AIzaSyBEsibRXWWJrtSQ0SSKf7z8V9HpjdsnOF8',
      projectId: 'test-32b81'
    }, {
      saved: 'Die Änderungen wurden erfolgreich gespeichert.',
      processing: 'Die Verarbeitung läuft.',
      wait: 'Bitte warten.',
      done: 'Erfolgreich abgeschlossen.',
      submitted: 'Die Daten wurden übermittelt.',
      submittedInBackground: 'Die Daten wurden gespeichert und werden übermittelt, sobald eine Internetverbindung besteht.',
      disconnected: 'Die Verbindung wurde unterbrochen.',
      connected: 'Die Verbindung wurde wiederhergestellt.',
      error: 'Fehler'
    })
  ]
})
export class AppModule { }
```

It's very recommended that you create your own `google firebase project` first and then provide its `apiKey` and `projectId` to the initializeApp config parameters.


## Create your first form app

Your component `pages/home.ts` ts ends up with something like this:

```typescript
import { AppsappModuleProvider, PersistableModel, HasConditions, IsInt, Min, Max, HasLabel, IsDateRange, HasDescription, IsSelect} from "appsapp-module";

@Component({
  selector: 'page-home',
  template: ´
  <appsapp-input [model]="myModel"></appsapp-input>
  <button ion-button round outline (click)="save()" [disabled]="!myModel.hasChanges()">
    Änderungen speichern
  </button>
  ´
})

export class HomePage {

  myModel: myModel;

  constructor(public navCtrl: NavController, appsappModuleProvider: AppsappModuleProvider) {
    this.myModel = appsappModuleProvider.new(myModel);
  }

  save() {
      
      this.myModel.save({
        name: 'googleSheets',
        data: {
          to: 'webmaster@appsapp.io'
        }
      });
          
  }

}


export class myModel extends PersistableModel {
  @IsInt() @Min(5) @Max(15) @HasDescription('please enter a number') number: number;
  @HasConditions([{property: 'number', value: 7, validator: 'min'}]) @HasLabel('Your text') text: string = 'test';
  @IsDateRange() daterange: object;
  @IsSelect({
      source: {
        url: 'https://jsonplaceholder.typicode.com/users/',
        mapping: {text: 'address.city', value: 'address.geo'}
      }
    }) adressen: object = [];
}

```

**Congratulation, you have created your first form app with appsApp!**

![Alt text](appsapp-module-screen2.png?raw=true "appsApp.io")

***

## Using built-in backend services

### Overview

AppsApp has built-in backend services. Every model you define in the frontend (ts) is automatically used for validation in the backend services. You must not write any backend code yourself. Pre built are:

#### Email finisher 
Add `amazonAccessKey.json` to your project root and provide your Amazon SES IAM credentials, you have created before. 
```json
 {
  "accessKeyId": "XXXX",
  "secretAccessKey": "YYYY",
  "region": "eu-west-1"
  }
```

#### Google Spreadsheet finisher
Add `serviceAccountKey.json` to yours project root with your google service account credentials. Don't forget the enable the relevant api services like `google spreadsheet` and `google drive` in your google developer console.
```json
{
  "type": "service_account",
  "private_key": "-----BEGIN PRIVATE KEY----------END PRIVATE KEY-----",
  "client_email": "firebase-adminsdk-yyy@xxxx.iam.gserviceaccount.com",
}

```
More finishers and backend services are upcoming.

### Install

To make run the pre-build backend services described above, first of all you need `firebase-cli`:

```bash
$ npm install -g firebase-cli
```

Then go to your apps project root and run:

```bash
$ firebase init
```
Choose `◯ Functions: Configure and deploy Cloud Functions` and select one of your previously created firebase project as the `default project` for this project root.

Now you are ready to deploy the built-in backend services the first time:

```bash
$ appsapp
```

Please ensure that you have a working internet connection all the time.

### Deploy

While deploying firebase functions it takes a while. After first run you can speed it up by watching your apps build files for any changes. Start the following command whenever you are editing your apps source.

```bash
$ appsapp -w
```
Please note, that you have an internet connection while the script above is running. If not, then stop the script execution and start it again when you are connected next time.



## Decorators

### Basic validators from npm class-validator

All of the validators are also available from the `appsapp-module` for  importing to your ts files without any care.

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| **Common validation decorators**                                                                                                                                                   |
| `@IsDefined(value: any)`                        | Checks if value is defined (!== undefined, !== null). This is the only decorator that ignores skipMissingProperties option.      |
| `@IsOptional()`                                 | Checks if given value is empty (=== null, === undefined) and if so, ignores all the validators on the property.                         |
| `@Equals(comparison: any)`                      | Checks if value equals ("===") comparison.                                                                                       |
| `@NotEquals(comparison: any)`                   | Checks if value not equal ("!==") comparison.                                                                                    |
| `@IsEmpty()`                                    | Checks if given value is empty (=== '', === null, === undefined).                                                                |
| `@IsNotEmpty()`                                 | Checks if given value is not empty (!== '', !== null, !== undefined).                                                            |
| `@IsIn(values: any[])`                          | Checks if value is in a array of allowed values.                                                                                 |
| `@IsNotIn(values: any[])`                       | Checks if value is not in a array of disallowed values.                                                                          |
| **Type validation decorators**                                                                                                                                                     |
| `@IsBoolean()`                                  | Checks if a value is a boolean.                                                                                                  |
| `@IsDate()`                                     | Checks if the string is a date.                                                                                                  |
| `@IsString()`                                   | Checks if the string is a string.                                                                                                |
| `@IsNumber()`                                   | Checks if the string is a number.                                                                                                |
| `@IsInt()`                                      | Checks if the value is an integer number.                                                                                        |
| `@IsArray()`                                    | Checks if the string is an array                                                                                                 |
| `@IsEnum(entity: object)`                         | Checks if the value is an valid enum                                                                                             |
| **Number validation decorators**                                                                                                                                                   |
| `@IsDivisibleBy(num: number)`                   | Checks if the value is a number that's divisible by another.                                                                     |
| `@IsPositive()`                                 | Checks if the value is a positive number.                                                                                        |
| `@IsNegative()`                                 | Checks if the value is a negative number.                                                                                        |
| `@Max(max: number)`                             | Checks if the given number is greater than given number.                                                                         |
| `@Min(min: number)`                             | Checks if the given number is less than given number.                                                                            |
| **Date validation decorators**                                                                                                                                                     |
| `@MinDate(date: Date)`                          | Checks if the value is a date that's after the specified date.                                                                   |
| `@MaxDate(date: Date)`                          | Checks if the value is a date that's before the specified date.                                                                  |                                                                                                                                                  |
| **String-type validation decorators**                                                                                                                                              |
| `@IsBooleanString()`                            | Checks if a string is a boolean (e.g. is "true" or "false").                                                                     |
| `@IsDateString()`                               | Checks if a string is a date (e.g. "2017-06-07T14:34:08.700Z" or "2017-06-07T14:34:08.700").                                                                                                    |
| `@IsNumberString()`                             | Checks if a string is a number.                                                                                                  |
| **String validation decorators**                                                                                                                                                   |
| `@Contains(seed: string)`                       | Checks if the string contains the seed.                                                                                          |
| `@NotContains(seed: string)`                    | Checks if the string not contains the seed.                                                                                      |
| `@IsAlpha()`                                    | Checks if the string contains only letters (a-zA-Z).                                                                             |
| `@IsAlphanumeric()`                             | Checks if the string contains only letters and numbers.                                                                          |
| `@IsAscii()`                                    | Checks if the string contains ASCII chars only.                                                                                  |
| `@IsBase64()`                                   | Checks if a string is base64 encoded.                                                                                            |
| `@IsByteLength(min: number, max?: number)`      | Checks if the string's length (in bytes) falls in a range.                                                                       |
| `@IsCreditCard()`                               | Checks if the string is a credit card.                                                                                           |
| `@IsCurrency(options?: IsCurrencyOptions)`      | Checks if the string is a valid currency amount.                                                                                 |
| `@IsEmail(options?: IsEmailOptions)`            | Checks if the string is an email.                                                                                                |
| `@IsFQDN(options?: IsFQDNOptions)`              | Checks if the string is a fully qualified domain name (e.g. domain.com).                                                         |
| `@IsFullWidth()`                                | Checks if the string contains any full-width chars.                                                                              |
| `@IsHalfWidth()`                                | Checks if the string contains any half-width chars.                                                                              |
| `@IsVariableWidth()`                            | Checks if the string contains a mixture of full and half-width chars.                                                            |
| `@IsHexColor()`                                 | Checks if the string is a hexadecimal color.                                                                                     |
| `@IsHexadecimal()`                              | Checks if the string is a hexadecimal number.                                                                                    |
| `@IsIP(version?: "4"|"6")`                      | Checks if the string is an IP (version 4 or 6).                                                                                  |
| `@IsISBN(version?: "10"|"13")`                  | Checks if the string is an ISBN (version 10 or 13).                                                                              |
| `@IsISIN()`                                     | Checks if the string is an ISIN (stock/security identifier).                                                                     |
| `@IsISO8601()`                                  | Checks if the string is a valid ISO 8601 date.                                                                                   |
| `@IsJSON()`                                     | Checks if the string is valid JSON.                                                                                              |
| `@IsLowercase()`                                | Checks if the string is lowercase.                                                                                               |
| `@IsMobilePhone(locale: string)`                | Checks if the string is a mobile phone number.                                                                                   |
| `@IsMongoId()`                                  | Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.                                                |
| `@IsMultibyte()`                                | Checks if the string contains one or more multibyte chars.                                                                       |
| `@IsNumericString()`                            | Checks if the string is numeric.                                                                                                 |
| `@IsSurrogatePair()`                            | Checks if the string contains any surrogate pairs chars.                                                                         |
| `@IsUrl(options?: IsURLOptions)`                | Checks if the string is an url.                                                                                                  |
| `@IsUUID(version?: "3"|"4"|"5")`                | Checks if the string is a UUID (version 3, 4 or 5).                                                                              |
| `@IsUppercase()`                                | Checks if the string is uppercase.                                                                                               |
| `@Length(min: number, max?: number)`            | Checks if the string's length falls in a range.                                                                                  |
| `@MinLength(min: number)`                       | Checks if the string's length is not less than given number.                                                                     |
| `@MaxLength(max: number)`                       | Checks if the string's length is not more than given number.                                                                     |
| `@Matches(pattern: RegExp, modifiers?: string)` | Checks if string matches the pattern. Either matches('foo', /foo/i) or matches('foo', 'foo', 'i').
| `@IsMilitaryTime()`                             | Checks if the string is a valid representation of military time in the format HH:MM.
| **Array validation decorators**                                                                                                                                                    |
| `@ArrayContains(values: any[])`                 | Checks if array contains all values from the given array of values.                                                              |
| `@ArrayNotContains(values: any[])`              | Checks if array does not contain any of the given values.                                                                        |
| `@ArrayNotEmpty()`                              | Checks if given array is not empty.                                                                                              |
| `@ArrayMinSize(min: number)`                    | Checks if array's length is as minimal this number.                                                                              |
| `@ArrayMaxSize(max: number)`                    | Checks if array's length is as maximal this number.                                                                              |
| `@ArrayUnique()`                                | Checks if all array's values are unique. Comparison for objects is reference-based.                                              |

### Special validators from npm appsapp-module

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| **General ui decorators**                                                                                                                                                |
| `@HasConditions([...])`                        | Show/hide ui for this property by conditions      |
| `@HasLabel(label: string)`        | Set the ui label for this property      |
| `@HasDescriptions(description: string)`        | Adds a short decriptions to the ui for this property      |
| `@HasPrecision(precision: number)`        | Defines precision like number of decimals     |
| `@IsBirthDate(precision: number)`        | Defines precision like number of decimals     |
| **Specific ui decorators**                                                                                                                                                |
| `@IsBirthDate()`                        | Set special ui for birth dates      |
| `@IsCalendar()`        | Set special ui for a calendar view      |
| `@IsDateRange()`        | Set special ui for a date range view      |
| `@IsNumpad()`        | Set special ui for a num pad view    |
| `@IsPassword()`        | Set special ui password input element    |
| `@IsList(itemType)`        | Adds a repeater of given itemType (reusable model or object)   |
| `@IsRating(length: number)`        | Set special ui long text   |


## License

MIT © [Michael Egli](mailto:michael.egli@appsapp.io)
