import { Component } from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";

/**
 * Generated class for the AppsappInputBooleanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input-boolean',
    template: `
        <mbsc-form #mbscInstanceForm="mobiscroll">
            <mbsc-switch [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}
                <span class="mbsc-desc">{{_description}}</span>
            </mbsc-switch>
        </mbsc-form>

            `
})



export class AppsappInputBooleanComponent extends AppsappInputAbstractComponent {




}
