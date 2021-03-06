import {Component, Input} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";



/**
 * Generated class for the AppsappInputDatesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input-dates',
    template: `
      
     

    `
})
export class AppsappInputDatesComponent extends AppsappInputAbstractComponent {


  @Input() range: Array<Date> = [];
  locked: boolean = false;
  isInline: boolean = false;

  /**
   *
   * @param {ConfigModel} config
   */
  init(config) {


    let self = this;

    this.get().subscribe((value) => {

      if (!self.locked && value && value.length == 2) {
        self.range = [new Date(value[0]), new Date(value[1])];
      }

    });

    this.setMbscOption({
      onShow: function (event, inst) {
        self.locked = true;
      },
      onCancel: function (event, inst) {
        self.locked = false;
      }
      ,
      onSet: function (event, inst) {
        let from = new Date(inst._startDate);
        let to = new Date(inst._endDate);
        self.model.setProperty(self.property, [from, to]);
        self.locked = false;
      }
    })


    const options = this.model.getMetadataValue(this.property, 'isDateRange');

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

      if (options.timeFormat) {
        this.setMbscOption({timeFormat: options.timeFormat});
      }

      if (options.display && options.display == 'inline') {
        this.isInline = true;
      }

    }

    this.setMbscOption({
      display: options && options.display ? options.display : (config.getOs() !== 'desktop' ? 'bottom' : 'center')
    });


  }


  beforeModelChanges(model, property, value) {

    return false;

  }




}
