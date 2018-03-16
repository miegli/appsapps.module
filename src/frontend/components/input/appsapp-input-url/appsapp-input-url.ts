import { Component } from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";

/**
 * Generated class for the AppsappInputUrlComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input-url',
    template: `
        
            <mbsc-input [error]="validator | async" [placeholder]="placeholder" type="url" [ngModel]="_ngModelGettter " (ngModelChange)="modelChanges($event)">{{_label}}</mbsc-input>
       

    `
})
export class AppsappInputUrlComponent extends AppsappInputAbstractComponent {



}
