import { Component } from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";


/**
 * Generated class for the AppsappInputTextComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input-text',
    template: `
        <mbsc-form #mbscInstanceForm="mobiscroll">
            <mbsc-input [error]="validator | async" [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}</mbsc-input>
        </mbsc-form>

    `
})



export class AppsappInputTextComponent extends AppsappInputAbstractComponent {




}
