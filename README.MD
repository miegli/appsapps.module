# appsapp-module for Angular and Ionicframework

This is an appsApp collection of high quality ui components with awesome backend and validation services full included. Now you build super sophisticated Angular2/Ionic2 apps using TypeScript. Supports Angular's ngc and Ahead-of-Time compiling.

Circular condition validators are the unique selling points. You gonna love it!
 
![Alt text](appsapp-module-screen.png?raw=true "appsApp.io")


## Installation

To install this library, run:

```bash
$ npm install appsapp-module --save
```

## Install

Once you have kickstarted your ionic or angular ap, you can import appsApp to your application by running:

```bash
$ npm install appsapp-module
```

Install peer dependencies if needed:

```bash
$ npm install --save angular-2-local-storage@^1.0.1
$ npm install --save angular2-uuid@^1.1.1
$ npm install --save angularfire2@5.0.0-rc.0
$ npm install --save class-transformer@^0.1.8
$ npm install --save class-validator@^0.7.3
$ npm install --save firebase@^4.6.1
$ npm install --save object-hash@1.2.0
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

## License

MIT © [Michael Egli](mailto:michael.egli@appsapp.io)
