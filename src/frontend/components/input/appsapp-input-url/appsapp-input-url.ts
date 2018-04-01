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

        <mat-form-field style="width:100%">
            <input (ngModelChange)="modelChanges($event)" type="url" [errorStateMatcher]="errorStateMatcher" [ngModel]="_ngModelGettter | async" matInput [placeholder]="placeholder">
            <mat-label>{{_label}}</mat-label>
            <mat-hint align="start" *ngIf="description.length">{{description}}</mat-hint>
            <mat-error *ngIf="_hasErrorsText.length">{{_hasErrorsText}}</mat-error>
            <button mat-button *ngIf="clearable &&  model[property] &&  model[property].length" matSuffix mat-icon-button aria-label="Clear" (click)="clear()">
                <mat-icon>close</mat-icon>
            </button>
        </mat-form-field>
       

    `
})
export class AppsappInputUrlComponent extends AppsappInputAbstractComponent {



}
