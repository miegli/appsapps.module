import {Component, Output} from '@angular/core';
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

      <mat-form-field style="width:100%"
                      [hideRequiredMarker]="formGroupOptions.value.hideRequired"
                      [floatLabel]="formGroupOptions.value.floatLabel">
          <input (ngModelChange)="modelChanges($event)" [errorStateMatcher]="errorStateMatcher" [maxlength]="max" [ngModel]="_ngModelGettter | async" matInput [placeholder]="placeholder"  [required]="required">
          <mat-label>{{_label}}</mat-label>
          <mat-hint align="start" *ngIf="description.length">{{description}}</mat-hint>
          <mat-hint align="end" *ngIf="max && model[property]">{{model[property].length}} / {{max}}</mat-hint>
          <mat-error *ngIf="_hasErrorsText.length">{{_hasErrorsText}}</mat-error>
          <button mat-button *ngIf="clearable &&  model[property] &&  model[property].length" matSuffix mat-icon-button aria-label="Clear" (click)="clear()">
              <mat-icon>close</mat-icon>
          </button>
      </mat-form-field>

  `
})


export class AppsappInputTextComponent extends AppsappInputAbstractComponent {

  @Output() max: number = 0;


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
