import {Component, Output} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";

/**
 * Generated class for the AppsappInputNumberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input-integer',
    template: `
        
            <ng-container [ngSwitch]="__type">
                <mbsc-input [error]="validator | async"  *ngSwitchCase="'default'" #mbscInstance="mobiscroll" mbsc-numpad-decimal [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}</mbsc-input>
                <mbsc-stepper *ngSwitchCase="'stepper'" #mbscInstance="mobiscroll" [min]="__min" [max]="__max" [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}
                    <span class="mbsc-desc">{{_description}}</span>
                </mbsc-stepper>
            </ng-container>
   

    `
})
export class AppsappInputIntegerComponent extends AppsappInputAbstractComponent {

  @Output() __type = 'default';
  @Output() __min = 0;
  @Output() __max = 0;

  modelChanges(event) {
    this.model.setProperty(this.property, parseInt(event));
  }


  /**
   * trigger befor init method
   */
  beforeInit() {


    if (this.model.getMetadataValue(this.property, 'max') <= 25) {
      this.__type = 'stepper';
      this.__min = this.model.getMetadataValue(this.property, 'min') ? this.model.getMetadataValue(this.property, 'min') : 0;
      this.__max = this.model.getMetadataValue(this.property, 'max') ? this.model.getMetadataValue(this.property, 'max') : 999999999;
    } else {
      this.setMbscOption({
        scale: 0,
        max: this.model.getMetadataValue(this.property, 'max') ? this.model.getMetadataValue(this.property, 'max') : 999999999,
        min: this.model.getMetadataValue(this.property, 'min') ? this.model.getMetadataValue(this.property, 'min') : 0
      });
    }


  }

  /**
   *
   * @param {ConfigModel} config
   */
  afterInit(config) {


  }

}
