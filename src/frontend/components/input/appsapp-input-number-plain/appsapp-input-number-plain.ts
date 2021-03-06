import {Component} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";

/**
 * Generated class for the AppsappInputNumberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input-number-plain',
    template: `
      
       
   
    `
})
export class AppsappInputNumberPlainComponent extends AppsappInputAbstractComponent {

  precision: number = 0;
  isInt: boolean = false;
  max: number = null;
  lastvalue: number = null;

  /**
   *
   * @param {ConfigModel} config
   */
  init(config) {


   if (this.model.getMetadata(this.property,'isPrecision').length) {
     this.precision = this.model.getMetadataValue(this.property,'isPrecision');
   }

   if (this.model.getMetadata(this.property,'isInt').length) {
     this.isInt = true;
   }

   if (this.model.getMetadata(this.property,'max').length) {
    this.max = this.model.getMetadataValue(this.property,'max');
   }

  }

  /**
   *
   * @param model
   * @param property
   * @param value
   */
  beforeModelChanges(model, property, value) {

    let changed = false;


    if (this.isInt) {


      let v = parseInt(value);
      if (v && v !== NaN && typeof v == 'number') {
        value = v;
      } else {
        value = null;
      }
      changed = true;
    }


    if (this.max !== null && value > this.max) {
      value = this.lastvalue;
      changed = true;
    }

    if (this.precision) {

      let v = parseFloat(value);
      let c = v.toFixed(this.precision);

      if (c.toString().length < v.toString().length) {
        changed = true;
        value = c;
      }

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
