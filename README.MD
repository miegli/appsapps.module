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
      apiKey: '***',
      projectId: 'appsapp-io'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## License

MIT © [Michael Egli](mailto:michael.egli@appsapp.io)
