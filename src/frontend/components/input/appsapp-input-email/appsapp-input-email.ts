import {Component} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";

/**
 * Generated class for the AppsappInputEmailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input-email',
    template: `
       
            <mbsc-input [error]="validator | async" [placeholder]="placeholder" [error]="validator | async" [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}</mbsc-input>

    `
})
export class AppsappInputEmailComponent extends AppsappInputAbstractComponent {


}
