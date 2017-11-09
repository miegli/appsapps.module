import {Component, Output} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";

/**
 * Generated class for the AppsappInputTelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input-tel',
    template: `
        <mbsc-form #mbscInstanceForm="mobiscroll">
            <mbsc-input [error]="validator | async"  #mbscInstance="mobiscroll" mbsc-numpad type="tel" [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}} {{prefix}}</mbsc-input>
        </mbsc-form>

    `
})
export class AppsappInputTelComponent extends AppsappInputAbstractComponent {

  @Output() prefix: string = ''


  ngAfterContentInit() {


    this.prefix = this.model.getMetadataValue(this.property, 'isPhoneNumber') ? this.model.getMetadataValue(this.property, 'isPhoneNumber') : '';

  }

  /**
   *
   * @param {ConfigModel} config
   */
  afterInit(config) {

    let d = 'd';


    this.setMbscOption({
      display: config.getOs() !== 'desktop' ? 'bottom' : 'center',
      cssClass: 'md-phone-num',
      template: '{plus}'+d.repeat((this.prefix.length ?  this.prefix.length + 13 : 16)),
      maxLength: (this.prefix.length ?  this.prefix.length + 13 : 16),
      allowLeadingZero: true,
      leftKey: {
        text: '+',
        value: '',
        variable: 'plus:+'
      },
      formatValue: function (numbers, vars, inst) {
        var newVal = '';
        if (vars.plus) {
          newVal += vars.plus;
        }
        newVal += numbers.join().replace(/,/g, '');
        return newVal;
      },
      parseValue: function (value) {
        if (value) {
          return value.toString().split('');
        }
        return [];
      },
      validate: function (event, inst) {
        var disabled = [],
          invalid = false;
        if (inst.isVisible()) {
          inst._markup[0].querySelector('.mbsc-np-dsp').innerHTML = inst.settings.formatValue(event.values, event.variables, inst) || '&nbsp;';
        }
        return {
          invalid: invalid,
          disabled: disabled
        };
      }
    });

    // this.setMbscOption({
    //   display: 'bottom',
    //   cssClass: 'md-phone-num',
    //   template: '{plus}ddddddddddd',
    //   maxLength: (this.prefix.length ?  this.prefix.length + 13 : 16),
    //   allowLeadingZero: true,
    //   leftKey: {
    //     text: '+',
    //     value: '',
    //     variable: 'plus:+'
    //   }
    // });

  }

  /**
   *
   * @param model
   * @param property
   * @param value
   */
  beforeModelChanges(model, property, value) {


    let self = this;
    let p = this.prefix ? this.prefix : '';
    let f = '';


    const e = value.substr(0, p.length) == p ? value.substr(p.length) : value;

    if (p.length) {
      f = e.replace(/[^0-9]/g, '');
    } else {
      f = e.replace(/[^\\+0-9]/g, '');
    }


    f = p.length && f.substr(0, 1) == '0' ? f.substr(1) : f;

    if (p.length) {
      value = p + f.replace(/([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{2})/g, ' \$1 \$2 \$3 \$4');
    } else {
      if (f.substr(0, 1) == '+') {
        value = p + f.replace(/([\\+0-9]{3})([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{2})/g, '\$1 \$2 \$3 \$4 \$5');
      } else {
        value = p + f.replace(/([0-9]{3})([0-9]{3})([0-9]{2})([0-9]{2})/g, '\$1 \$2 \$3 \$4');
      }

    }

    if (p.length) {
      if (value.length > p.length + 13) {
        value = value.substr(0, p.length + 13);
        self._ngModelGettter = self.model.update(self.property, value).getProperty(self.property);
      }
    } else {
      if (value.length > p.length + 16) {
        value = value.substr(0, p.length + 16);
        self._ngModelGettter = self.model.update(self.property, value).getProperty(self.property);
      }
    }

    this.model.update(this.property, value).setProperty(this.property, value);


    return false;

  }


}
