import {Component, Output} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";


/**
 * Generated class for the AppsappInputDateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input-time',
    template: `

        <mbsc-input [ngClass]="{isInline: isInline}" [error]="validator | async" #mbscInstance="mobiscroll" mbsc-time
                    [ngModel]="_ngModelGettter | async"
                    (ngModelChange)="modelChanges($event)">{{_label}}
        </mbsc-input>


    `
})
export class AppsappInputTimeComponent extends AppsappInputAbstractComponent {

    @Output() isInline: boolean = false;


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
    init(config) {

        this.model[this.property] = typeof this.model[this.property] == 'string' ? new Date(this.model[this.property]) : this.model[this.property];

        if (this.model.getMetadataValue(this.property, 'max')) {
            const max: Date = this.model.getMetadataValue(this.property, 'max');
            this.setMbscOption({max: max});
        }

        if (this.model.getMetadataValue(this.property, 'min')) {
            const min: Date = this.model.getMetadataValue(this.property, 'min');
            this.setMbscOption({min: min});
        }


        const options = this.model.getMetadataValue(this.property, 'isTime');

        if (options) {


            if (options.invalid) {
                this.setMbscOption({invalid: options.invalid});
            }


            if (options.steps) {
                this.setMbscOption({steps: options.steps});
            }


            if (options.timeFormat) {
                this.setMbscOption({timeFormat: options.timeFormat});
            }


            if (options.display == 'inline') {
                this.isInline = true;
            }

        }

        this.setMbscOption({
            display: options && options.display ? options.display : (config.getOs() !== 'desktop' ? 'bottom' : 'center')
        });


    }


}
