# appsapp-module for Angular and Ionicframework

**Attention: Don't use it in production environment. It's an alpha version for a concept study.** 

This is an appsApp collection of high quality ui components with awesome backend and validation services full included. Now you build super sophisticated Angular/Ionic apps using TypeScript. Supports Angular's ngc and Ahead-of-Time compiling.

Circular condition validators are the unique selling points. You gonna love it!
 
![Alt text](appsapp-module-screen.png?raw=true "appsApp.io")


## Install

Once you have kickstarted your ionic or angular app, you can import appsApp to your application by running:

```bash
$ npm install appsapp-module --save
```

You also need mobiscroll. So please obtain a licence (see https://www.mobiscroll.com/) and then run:

```bash
$ npm install -g @mobiscroll/cli
```


If you are using ionic then run in your apps root directory:

```bash
$ mobiscroll config ionic
```


and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import appsApp module
import { AppsappModule } from 'appsapp-module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppsappModule.initializeApp({
      apiKey: '**firebase-public-api-key**',
      projectId: '**firebase-project-id**'
    }, {
      saved: 'Die Änderungen wurden erfolgreich gespeichert.',
      processing: 'Die Verarbeitung läuft.',
      wait: 'Bitte warten.',
      done: 'Erfolgreich abgeschlossen.',
      submitted: 'Die Daten wurden übermittelt.',
      submittedInBackground: 'Die Daten wurden gespeichert und werden übermittelt, sobald eine Internetverbindung besteht.',
      disconnected: 'Die Verbindung wurde unterbrochen.',
      connected: 'Die Verbindung wurde wiederhergestellt.'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Create your first form app

Your component ts ends up with:
```typescript
import {AppsappModuleProvider, PersistableModel, HasConditions, HasPrecision, HasLabel, IsDateRange, HasDescription} from "appsapp-module";
import {IsInt, Min, Max, IsIn} from "class-validator";

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
    this.myModel.save();
  }

}


export class myModel extends PersistableModel {
  @IsInt() @Min(5) @Max(15) @HasDescription('please enter a number') number: number;
  @HasConditions([{property: 'number', value: 7, validator: 'min'}]) @HasLabel('Your text') text: string = 'test';
  @IsDateRange() daterange: object;
}

```

**Congratulation, you have created your first form app with appsApp!**


![Alt text](appsapp-module-screen2.png?raw=true "appsApp.io")

## License

MIT © [Michael Egli](mailto:michael.egli@appsapp.io)
