import {Component} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";

/**
 * Generated class for the AppsappInputNumberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input-number',
    template: `
        <mbsc-form #mbscInstanceForm="mobiscroll">
            <mbsc-input [error]="validator | async"  #mbscInstance="mobiscroll" mbsc-numpad-decimal [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}</mbsc-input>
        </mbsc-form>

    `
})
export class AppsappInputNumberComponent extends AppsappInputAbstractComponent {


  /**
   *
   * @param {ConfigModel} config
   */
  afterInit(config) {

    this.setMbscOption({
      scale: this.model.getMetadataValue(this.property,'hasPrecision') ? this.model.getMetadataValue(this.property,'hasPrecision') : 2,
      max: this.model.getMetadataValue(this.property,'max') ? this.model.getMetadataValue(this.property,'max') : 999999999,
      min: this.model.getMetadataValue(this.property,'min') ? this.model.getMetadataValue(this.property,'min') : 0
    });

  }

}