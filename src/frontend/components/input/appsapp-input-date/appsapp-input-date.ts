import {Component} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";


/**
 * Generated class for the AppsappInputDateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input-date',
    template: `
        <mbsc-form #mbscInstanceForm="mobiscroll">
            <mbsc-input [error]="validator | async"  #mbscInstance="mobiscroll" mbsc-calendar [ngModel]="_ngModelGettter | async"
                        (ngModelChange)="modelChanges($event)">{{_label}}</mbsc-input>
        </mbsc-form>

    `
})
export class AppsappInputDateComponent extends AppsappInputAbstractComponent {


  beforeModelChanges(model, property, value) {
    // create iso date
    let date = Date.parse(value);
    value = !isNaN(date) ? new Date(date) : null;
    console.log(property, value);
    model.setProperty(property, value);

    return false;

  }



  /**
   *
   * @param {ConfigModel} config
   */
  afterInit(config) {


    if (this.model.getMetadataValue(this.property, 'maxDate')) {
      const maxDate: Date = this.model.getMetadataValue(this.property, 'maxDate');
      this.setMbscOption({max: maxDate});
    }

    if (this.model.getMetadataValue(this.property, 'minDate')) {
      const minDate: Date = this.model.getMetadataValue(this.property, 'minDate');
      this.setMbscOption({min: minDate});
    }


    const options = this.model.getMetadataValue(this.property, 'calendar');

    if (options) {

      if (options.maxDate) {
        this.setMbscOption({max: options.maxDate});
      }

      if (options.minDate) {
        this.setMbscOption({min: options.minDate});
      }

      if (options.invalid) {
        this.setMbscOption({invalid: options.invalid});
      }

      if (options.controls) {
        this.setMbscOption({controls: options.controls});
      }

      if (options.steps) {
        this.setMbscOption({steps: options.steps});
      }

    }


    this.setMbscOption({
      display: options && options.display ? options.display : (config.getOs() !== 'desktop' ? 'bottom' : 'center')
    });


  }


}
