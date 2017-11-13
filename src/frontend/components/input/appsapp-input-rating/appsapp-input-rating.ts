import {Component, Input, Output} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";

/**
 * Generated class for the AppsappInputNumberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input-rating',
    template: `
        <mbsc-form #mbscInstanceForm="mobiscroll">
            <div class="mbsc-form-group-title" *ngIf="isInline">{{_label}}</div>
            <mbsc-input [error]="validator | async" #mbscInstance="mobiscroll" mbsc-rating [ngModel]="rating" [type]="isInline ? 'hidden' : 'text'">{{_label}}</mbsc-input>
        </mbsc-form>

    `
})
export class AppsappInputRatingComponent extends AppsappInputAbstractComponent {


  @Input() rating: any;
  locked = false;
  @Output() isInline: boolean = false;
  @Output() __label: string = '';


  modelChanges(event) {
    this.model.setProperty(this.property, parseInt(event));
  }


  /**
   *
   * @param {ConfigModel} config
   */
  afterInit(config) {

    let self = this;


    let ratingoptions = this.model.getMetadataValue(this.property, 'rating');

    let values = [];

    let min = this.model.getMetadataValue(this.property, 'min') ? this.model.getMetadataValue(this.property, 'min') : 1;
    let max = this.model.getMetadataValue(this.property, 'max') ? this.model.getMetadataValue(this.property, 'max') : 5;

    if (ratingoptions && ratingoptions.values) {
      ratingoptions.values.forEach((value) => {
        values.push(value);
      });
      this.setMbscOption({
        showText: true
      });
    } else {
      for (let i = min; i <= max; i++) {
        values.push(i);
      }

      this.setMbscOption({
        display: config.getOs() !== 'desktop' ? 'bottom' : 'center',
        });
    }


    this.setMbscOption({
      values: values
    });

    if (this._description) {
      this.setMbscOption({
        headerText: self._description
      });
    }


    if (ratingoptions && ratingoptions.style) {
      this.setMbscOption({
        style: ratingoptions.style
      });
    }

    if (ratingoptions && ratingoptions.display) {
      this.setMbscOption({
        display: ratingoptions.display
      });
      if (ratingoptions.display == 'inline') {
        self.isInline = true;
      }
    }

    this.setMbscOption({
      icon: ratingoptions && ratingoptions.icon ? ratingoptions.icon : { filled: 'star3', empty: 'star3'},
      onInit: function(event, inst) {
        self.get().subscribe((value) => {
          if (!self.locked) {
            self.rating = value;
          }

        });

      },
      onShow: function (event, inst) {
        self.locked = true;
      },
      onCancel: function (event, inst) {
        self.locked = false;
      }
      ,
      onSet: function (event, inst) {
        self.model.setProperty(self.property, inst.getVal());
        self.locked = false;
      }
    });






  }

  beforeModelChanges(model, property, value) {
    return false;

  }

}
