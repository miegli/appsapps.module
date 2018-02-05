import {Component} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";

/**
 * Generated class for the AppsappInputTextareaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input-textarea',
    template: `
       
            <mbsc-textarea [error]="validator | async" [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}</mbsc-textarea>
   

    `
})
export class AppsappInputTextareaComponent extends AppsappInputAbstractComponent {

  maxLength: number = 0;
  currentLength: number = 0;
  label: string;

  /**
   *
   * @param {ConfigModel} config
   */
  afterInit(config) {

    let self = this;

    this.maxLength = this.model.getMetadataValue(this.property, 'isText') ? this.model.getMetadataValue(this.property, 'isText') : 0;

    this.label = this._label;


  }

  /**
   * event before model changes
   * @param model
   * @param property
   * @param value
   * @returns {boolean} false, then model changes will not be executed
   */
  beforeModelChanges(model, property, value) {

    if (this.maxLength) {

      this.currentLength = value.length;

      this._label = this.label + ' (' + (this.currentLength < this.maxLength ? this.currentLength : this.maxLength) + " / " + this.maxLength + ")";


      if (value.length > this.maxLength) {
        this.update(value.substr(0, this.maxLength));
        return false;
      } else {
        return true;
      }

    } else {
      return true;
    }


  }

}
