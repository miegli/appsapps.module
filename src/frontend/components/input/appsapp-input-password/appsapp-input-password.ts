import { Component } from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";

/**
 * Generated class for the AppsappInputPasswordComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input-password',
    template: `
        
            <mbsc-input [error]="validator | async" [placeholder]="placeholder" type="password" [password-toggle]="true" [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}</mbsc-input>
     

    `
})
export class AppsappInputPasswordComponent extends AppsappInputAbstractComponent {


}
