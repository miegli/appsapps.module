import {Component, Input} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";
import {ThemePalette} from "@angular/material";

/**
 * Generated class for the AppsappInputBooleanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input-boolean',
    template: `
        <div class="mat-form-field-wrapper" style="width:100%">
            <mat-slide-toggle style="width:100%" [ngModel]="_ngModelGettter | async"
                              (ngModelChange)="modelChanges($event)" [checked]="_ngModelGettter | async"
                              [color]="_color" [labelPosition]="_labelPosition">{{_label}}
            </mat-slide-toggle>
        </div>
    `
})


export class AppsappInputBooleanComponent extends AppsappInputAbstractComponent {

    @Input('aria-label') ariaLabel: string | null;
    @Input('aria-labelledby') ariaLabelledby: string | null;
    @Input() color: ThemePalette;
    @Input() disableRipple: boolean;
    @Input() disabled: boolean;
    @Input() labelPosition: 'before' | 'after';
    @Input() name: string | null;
    @Input() required: boolean;


}
