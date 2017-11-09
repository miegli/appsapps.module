# appsApp module

This is an appsApp collection of high quality ui components with awesome backend and validation services. Now you build super sophisticated Angular2/Ionic2 apps using TypeScript.

## Installing the module

run `npm install --save appsapp-module`.

## Using your module in an Ionic 2 app

```typescript
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Import the module
import {AppsappModule} from "appsapp-module";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AppsappModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}
```
