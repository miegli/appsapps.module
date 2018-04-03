import {Component, Output} from '@angular/core';
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

        <mat-form-field style="width:100%"
                        [hideRequiredMarker]="formGroupOptions.value.hideRequired"
                        [floatLabel]="formGroupOptions.value.floatLabel"
        >
            <input (ngModelChange)="modelChanges($event)" type="email" [errorStateMatcher]="errorStateMatcher" [ngModel]="_ngModelGettter | async" matInput [placeholder]="placeholder"  [required]="required">
            <mat-label>{{_label}}</mat-label>
            <mat-hint align="start" *ngIf="description.length">{{description}}</mat-hint>
            <mat-error *ngIf="_hasErrorsText.length">{{_hasErrorsText}}</mat-error>
            <button mat-button *ngIf="clearable &&  model[property] &&  model[property].length" matSuffix mat-icon-button aria-label="Clear" (click)="clear()">
                <mat-icon>close</mat-icon>
            </button>
        </mat-form-field>

    `
})
export class AppsappInputEmailComponent extends AppsappInputAbstractComponent {




}
