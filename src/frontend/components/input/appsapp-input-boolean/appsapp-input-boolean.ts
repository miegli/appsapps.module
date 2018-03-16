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
       
            <mbsc-switch [ngModel]="_ngModelGettter " (ngModelChange)="modelChanges($event)">{{_label}}
                <span class="mbsc-desc">{{_description}}</span>
            </mbsc-switch>
      

            `
})



export class AppsappInputBooleanComponent extends AppsappInputAbstractComponent {




}
