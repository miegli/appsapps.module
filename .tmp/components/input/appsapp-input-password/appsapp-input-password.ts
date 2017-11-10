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
        <mbsc-form #mbscInstanceForm="mobiscroll">
            <mbsc-input [error]="validator | async" type="password" [password-toggle]="true" [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}</mbsc-input>
        </mbsc-form>

    `
})
export class AppsappInputPasswordComponent extends AppsappInputAbstractComponent {


}
