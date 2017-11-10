import {Component} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";


/**
 * Generated class for the AppsappInputBirthdayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input-birthday',
    template: `
        <mbsc-form #mbscInstanceForm="mobiscroll">
            <mbsc-input [error]="validator | async" #mbscInstance="mobiscroll" mbsc-date [ngModel]="_ngModelGettter | async"
                        (ngModelChange)="modelChanges($event)">{{_label}}</mbsc-input>
        </mbsc-form>

    `
})
export class AppsappInputBirthdayComponent extends AppsappInputAbstractComponent {

    beforeModelChanges(model, property, value) {
        // create iso date
        let date = Date.parse(value);
        value = !isNaN(date) ? new Date(date) : null;
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
    } else {
      const maxDate = new Date();
      this.setMbscOption({max: maxDate});
    }


    if (this.model.getMetadataValue(this.property, 'minDate')) {
      const minDate: Date = this.model.getMetadataValue(this.property, 'minDate');
      this.setMbscOption({min: minDate});
    }

    this.setMbscOption({
      display: config.getOs() !== 'desktop' ? 'bottom' : 'center',
    });

  }

}
