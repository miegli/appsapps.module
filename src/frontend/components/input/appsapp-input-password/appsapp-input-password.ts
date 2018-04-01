import {Component, Output} from '@angular/core';
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


        <mat-form-field style="width:100%">
            <input [type]="hide ? 'password' : 'text'" (ngModelChange)="modelChanges($event)" [errorStateMatcher]="errorStateMatcher" [maxlength]="max" [ngModel]="_ngModelGettter | async" matInput [placeholder]="placeholder">
            <mat-label>{{_label}}</mat-label>
            <mat-hint align="start" *ngIf="description.length">{{description}}</mat-hint>
            <mat-hint align="end" *ngIf="max && model[property]">{{model[property].length}} / {{max}}</mat-hint>
            <mat-icon matSuffix (click)="hide = !hide">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>
            <mat-error *ngIf="_hasErrorsText.length">{{_hasErrorsText}}</mat-error>
        </mat-form-field>  
     

    `
})
export class AppsappInputPasswordComponent extends AppsappInputAbstractComponent {


    @Output() max: number = 0;
    lastvalue: number = null;
    hide = true;

    /**
     *
     * @param {ConfigModel} config
     */
    init(config) {


        if (this.model.getMetadata(this.property, 'maxLength').length) {
            this.max = this.model.getMetadataValue(this.property, 'maxLength');
        }

        if (this.max === null && this.model.getMetadata(this.property, 'length').length) {
            this.max = this.model.getMetadataValue(this.property, 'length')[1];
        }


    }



}
