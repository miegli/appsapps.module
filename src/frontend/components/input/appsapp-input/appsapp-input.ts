import {Component, Input} from '@angular/core';
import {AbstractComponent} from "../../abstractComponent";
import {AppsappModuleProvider} from "../../../providers/appsapp-module-provider";
import {Output} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

/**
 * Generate d class for the AppsappInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input',
    template: `
        <mbsc-form #mbscInstanceForm="mobiscroll">
        <ng-container [ngSwitch]="input.type" *ngFor="let input of _inputs">
            <ng-container *ngSwitchCase="'text'">
                <appsapp-input-text [model]="model" [property]="input.property" [label]="input.label"
                                    [hidden]="input.hidden | async"
                                    [parentPropertyMetadata]="input.parentPropertyMetadata"
                                    [parentProperty]="input.parentProperty"></appsapp-input-text>
            </ng-container>
            <ng-container *ngSwitchCase="'number'">
                <appsapp-input-number [model]="model" [property]="input.property" [label]="input.label"
                                      [hidden]="input.hidden | async"
                                      [parentPropertyMetadata]="input.parentPropertyMetadata"
                                      [parentProperty]="input.parentProperty"></appsapp-input-number>
            </ng-container>
            <ng-container *ngSwitchCase="'numberplain'">
                <appsapp-input-number-plain [model]="model" [property]="input.property" [label]="input.label"
                                            [hidden]="input.hidden | async"
                                            [parentPropertyMetadata]="input.parentPropertyMetadata"
                                            [parentProperty]="input.parentProperty"></appsapp-input-number-plain>
            </ng-container>
            <ng-container *ngSwitchCase="'integer'">
                <appsapp-input-integer [model]="model" [property]="input.property" [label]="input.label"
                                       [hidden]="input.hidden | async"
                                       [parentPropertyMetadata]="input.parentPropertyMetadata"
                                       [parentProperty]="input.parentProperty"></appsapp-input-integer>
            </ng-container>
            <ng-container *ngSwitchCase="'tel'">
                <appsapp-input-tel [model]="model" [property]="input.property" [label]="input.label"
                                   [hidden]="input.hidden | async"
                                   [parentPropertyMetadata]="input.parentPropertyMetadata"
                                   [parentProperty]="input.parentProperty"></appsapp-input-tel>
            </ng-container>
            <ng-container *ngSwitchCase="'password'">
                <appsapp-input-password [model]="model" [property]="input.property" [label]="input.label"
                                        [hidden]="input.hidden | async"
                                        [parentPropertyMetadata]="input.parentPropertyMetadata"
                                        [parentProperty]="input.parentProperty"></appsapp-input-password>
            </ng-container>
            <ng-container *ngSwitchCase="'email'">
                <appsapp-input-email [model]="model" [property]="input.property" [label]="input.label"
                                     [hidden]="input.hidden | async"
                                     [parentPropertyMetadata]="input.parentPropertyMetadata"
                                     [parentProperty]="input.parentProperty"></appsapp-input-email>
            </ng-container>
            <ng-container *ngSwitchCase="'url'">
                <appsapp-input-url [model]="model" [property]="input.property" [label]="input.label"
                                   [hidden]="input.hidden | async"
                                   [parentPropertyMetadata]="input.parentPropertyMetadata"
                                   [parentProperty]="input.parentProperty"></appsapp-input-url>
            </ng-container>
            <ng-container *ngSwitchCase="'textarea'">
                <appsapp-input-textarea [model]="model" [property]="input.property" [label]="input.label"
                                        [hidden]="input.hidden | async"
                                        [parentPropertyMetadata]="input.parentPropertyMetadata"
                                        [parentProperty]="input.parentProperty"></appsapp-input-textarea>
            </ng-container>
            <ng-container *ngSwitchCase="'time'">
                <appsapp-input-time [model]="model" [property]="input.property" [label]="input.label"
                                    [hidden]="input.hidden | async"
                                    [parentPropertyMetadata]="input.parentPropertyMetadata"
                                    [parentProperty]="input.parentProperty"></appsapp-input-time>
            </ng-container>    
            <ng-container *ngSwitchCase="'date'">
                <appsapp-input-date [model]="model" [property]="input.property" [label]="input.label"
                                    [hidden]="input.hidden | async"
                                    [parentPropertyMetadata]="input.parentPropertyMetadata"
                                    [parentProperty]="input.parentProperty"></appsapp-input-date>
            </ng-container>
            <ng-container *ngSwitchCase="'dates'">
                <appsapp-input-dates [model]="model" [property]="input.property" [label]="input.label"
                                     [hidden]="input.hidden | async"
                                     [parentPropertyMetadata]="input.parentPropertyMetadata"
                                     [parentProperty]="input.parentProperty"></appsapp-input-dates>
            </ng-container>
            <ng-container *ngSwitchCase="'boolean'">
                <appsapp-input-boolean [model]="model" [property]="input.property" [label]="input.label"
                                       [hidden]="input.hidden | async"
                                       [parentPropertyMetadata]="input.parentPropertyMetadata"
                                       [parentProperty]="input.parentProperty"></appsapp-input-boolean>
            </ng-container>
            <ng-container *ngSwitchCase="'birthday'">
                <appsapp-input-birthday [model]="model" [property]="input.property" [label]="input.label"
                                        [hidden]="input.hidden | async"
                                        [parentPropertyMetadata]="input.parentPropertyMetadata"
                                        [parentProperty]="input.parentProperty"></appsapp-input-birthday>
            </ng-container>
            <ng-container *ngSwitchCase="'select'">
                <appsapp-input-select [model]="model" [property]="input.property" [label]="input.label"
                                      [hidden]="input.hidden | async"
                                      [parentPropertyMetadata]="input.parentPropertyMetadata"
                                      [parentProperty]="input.parentProperty"></appsapp-input-select>
            </ng-container>
            <ng-container *ngSwitchCase="'list'">
                <appsapp-input-list [model]="model" [property]="input.property" [label]="input.label"
                                    [hidden]="input.hidden | async"
                                    [parentPropertyMetadata]="input.parentPropertyMetadata"
                                    [parentProperty]="input.parentProperty"></appsapp-input-list>
            </ng-container>
        </ng-container>
        </mbsc-form>
    `
})

export class AppsappInputComponent extends AbstractComponent {


    @Input() property: any;
    @Input() parentPropertyMetadata: any = null;
    @Input() parentProperty: any = null;
    @Input() model: any;
    @Input() label: string;
    @Output() options: any = {};
    @Output() _inputs: any = [];
    @Output() hidden: boolean = false;
    private _model: Observable<any>;

    constructor(public appsappModuleProvider: AppsappModuleProvider) {
        super(appsappModuleProvider);
    }

    registerConditions(property, model) {
        let self = this;
        if (property.substr(0, 1) !== "_") {
            this._inputs.push({
                type: model.getType(property),
                property: property,
                parentPropertyMetadata: this.parentPropertyMetadata,
                parentProperty: this.parentProperty,
                hidden: new Observable((observer) => {

                    var isConditionValue = false;


                    if (model.getMetadataValue(property, 'isHidden') === true) {
                        observer.next(true);
                    } else {

                        if (typeof model.getMetadataValue(property, 'isHidden') == 'object') {

                            model.getCondition('__isHidden__'+property).subscribe((c) => {

                                if (isConditionValue && !c.state) {
                                    observer.next(isConditionValue);
                                } else {
                                    observer.next(!c.state);
                                }

                            });
                        }

                        model.getCondition(property).subscribe((c) => {
                            observer.next(self.isHidden(c));
                            isConditionValue = self.isHidden(c);
                        });
                    }



                })
            });


        }
    }

    ngOnInitExecute(model) {

        let self = this;

        this._inputs = [];



        if (this.property) {

            this._inputs.push({
                type: model.getType(this.property),
                property: this.property,
                parentPropertyMetadata: this.parentPropertyMetadata,
                parentProperty: this.parentProperty,
                label: this.label,
                hidden: new Observable((observer) => {

                    self.registerConditions(self.property, model);

                })
            });

        } else {

            Object.keys(model).forEach((property) => {
              self.registerConditions(property,model);
            });
        }

    }

    ngOnInit() {


        let self = this;


        if (this.model) {


                if (this.model instanceof Observable) {
                    this._model = this.model;
                    this._model.subscribe((model) => {
                        self.model = model;
                        self.ngOnInitExecute(model);
                    })

                } else {
                    self.ngOnInitExecute(this.model);
                }

        }


    }


    /**
     * get is hidden from condition action
     * @param condition
     * @returns {boolean}
     */
    isHidden(condition) {

        let hidden = false, self = this;

        switch (condition.action) {

            case 'hide':
                hidden = !condition.state;
                break;

            case 'show':
                hidden = condition.state;
                break;

            default:
                hidden = condition.state;
        }

        return hidden;

    }


}

