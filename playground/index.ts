/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {PersistableModel} from "../src/models/persistable";
import {AppsappModuleProvider} from "../src/providers/appsapp-module-provider";


@Component({
  selector: 'app',
  template: `<sample-component></sample-component>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule ]
})
class AppModule {

  test: Test;

  constructor(appsappModuleProvider: AppsappModuleProvider) {

    this.test = appsappModuleProvider.new(Test);


  }


}

export class Test extends PersistableModel {

  name: string;

}


platformBrowserDynamic().bootstrapModule(AppModule);
