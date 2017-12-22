import {Component, Input} from '@angular/core';
import {AbstractComponent} from "../../abstractComponent";
import {AppsappModuleProvider} from "../../../providers/appsapp-module-provider";
import {Output} from "@angular/core";
import {Observable} from "rxjs/Observable";

/**
 * Generate d class for the AppsappInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'appsapp-input',
  template: `
      <ng-container [ngSwitch]="input.type" *ngFor="let input of _inputs">
          <ng-container *ngSwitchCase="'text'">
              <appsapp-input-text [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-text>
          </ng-container>
          <ng-container *ngSwitchCase="'number'">
              <appsapp-input-number [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-number>
          </ng-container>
          <ng-container *ngSwitchCase="'numberplain'">
              <appsapp-input-number-plain [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-number-plain>
          </ng-container>
          <ng-container *ngSwitchCase="'integer'">
              <appsapp-input-integer [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-integer>
          </ng-container>
          <ng-container *ngSwitchCase="'tel'">
              <appsapp-input-tel [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-tel>
          </ng-container>
          <ng-container *ngSwitchCase="'password'">
              <appsapp-input-password [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-password>
          </ng-container>
          <ng-container *ngSwitchCase="'email'">
              <appsapp-input-email [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-email>
          </ng-container>
          <ng-container *ngSwitchCase="'url'">
              <appsapp-input-url [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-url>
          </ng-container>
          <ng-container *ngSwitchCase="'textarea'">
              <appsapp-input-textarea [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-textarea>
          </ng-container>
          <ng-container *ngSwitchCase="'date'">
              <appsapp-input-date [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-date>
          </ng-container>
          <ng-container *ngSwitchCase="'dates'">
              <appsapp-input-dates [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-dates>
          </ng-container>
          <ng-container *ngSwitchCase="'boolean'">
              <appsapp-input-boolean [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-boolean>
          </ng-container>
          <ng-container *ngSwitchCase="'birthday'">
              <appsapp-input-birthday [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-birthday>
          </ng-container> 
          <ng-container *ngSwitchCase="'select'">
              <appsapp-input-select [model]="model" [property]="input.property" [label]="input.label" [hidden]="input.hidden | async"></appsapp-input-select>
          </ng-container>
      </ng-container>

  `
})

export class AppsappInputComponent extends AbstractComponent {


  @Input() property: any;
  @Input() model: any;
  @Input() label: string;
  @Output() options: any = {};
  @Output() _inputs: any = [];
  @Output() hidden: boolean = false;

  constructor(public appsappModuleProvider: AppsappModuleProvider) {

    super(appsappModuleProvider);


  }


  ngOnInit() {

    let self = this;



    if (this.model) {

      if (this.property) {

        this._inputs.push({type: this.model.getType(this.property), property: this.property, label: this.label, hidden: new Observable((observer) => {
          self.model.getCondition(self.property).subscribe((c) => {
            observer.next(self.isHidden(c));
          });
        })});

      } else {



        Object.keys(this.model).forEach((property) => {

          if (property.substr(0, 1) !== "_") {
            this._inputs.push({
              type: this.model.getType(property), property: property, hidden: new Observable((observer) => {
                self.model.getCondition(property).subscribe((c) => {
                  observer.next(self.isHidden(c));
                });
              })
            });


          }
        });
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

