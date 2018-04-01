import {Component, Output, ViewChild, ElementRef} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";


/**
 * Generated class for the AppsappInputDateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input-date',
    template: `

        <mat-form-field style="width:100%">

            <input (ngModelChange)="modelChanges($event)" [ngModel]="_ngModelGettter | async" matInput [min]="minDate"
                   [max]="maxDate" [matDatepicker]="picker" [placeholder]="placeholder">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>

            <mat-label>{{_label}}</mat-label>
            <mat-error *ngIf="_hasErrorsText.length">{{_hasErrorsText}}</mat-error>
            <mat-hint align="start" *ngIf="description.length">{{description}}</mat-hint>
            <mat-hint align="end" *ngIf="max && model[property]">{{model[property].length}} / {{max}}</mat-hint>
            <button mat-button *ngIf="clearable &&  model[property] &&  model[property].length" matSuffix
                    mat-icon-button aria-label="Clear" (click)="clear()">
            <mat-icon>close</mat-icon>
            </button>
        </mat-form-field>


    `
})
export class AppsappInputDateComponent extends AppsappInputAbstractComponent {

    @Output() isInline: boolean = false;
    @Output() minDate: Date;
    @Output() maxDate: Date;
    @ViewChild('wrapper') wrapper: ElementRef;

    beforeModelChanges(model, property, value) {

       model.setProperty(property, value.toDate());
        return false;

    }

    /**
     *
     * @param {ConfigModel} config
     */
    init(config) {

        if (this.model) {

            if (this.model.getMetadataValue(this.property, 'maxDate')) {
                this.maxDate = this.model.getMetadataValue(this.property, 'maxDate');
            }

            if (this.model.getMetadataValue(this.property, 'minDate')) {
                this.minDate = this.model.getMetadataValue(this.property, 'minDate');
            }


        }

    }


}
