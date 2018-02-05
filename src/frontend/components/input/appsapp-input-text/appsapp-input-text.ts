import {Component} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";


/**
 * Generated class for the AppsappInputTextComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input-text',
  template: `
    
      <mbsc-input [error]="validator | async" [ngModel]="_ngModelGettter | async"
                  (ngModelChange)="modelChanges($event)">{{_label}}
      </mbsc-input>
  

  `
})


export class AppsappInputTextComponent extends AppsappInputAbstractComponent {

  max: number = null;
  lastvalue: number = null;


  /**
   *
   * @param {ConfigModel} config
   */
  afterInit(config) {


    if (this.model.getMetadata(this.property, 'maxLength').length) {
      this.max = this.model.getMetadataValue(this.property, 'maxLength');
    }

    if (this.max === null && this.model.getMetadata(this.property, 'length').length) {
      this.max = this.model.getMetadataValue(this.property, 'length')[1];
    }


  }


  /**
   *
   * @param model
   * @param property
   * @param value
   */
  beforeModelChanges(model, property, value) {

    let self = this;
    let changed = false;


    if (this.max !== null && value.length > this.max) {
      value = this.lastvalue;
      changed = true;
    }


    this.lastvalue = value;

    if (changed) {
      this.update(value);
      return false;
    } else {
      return true;
    }


  }


}
