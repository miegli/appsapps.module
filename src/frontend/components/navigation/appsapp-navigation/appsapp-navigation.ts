import {Component, Input, ViewChild} from '@angular/core';
import {AbstractComponent} from "../../abstractComponent";
import {AppsappModuleProvider} from "../../../providers/appsapp-module-provider";
import {PersistableModel} from "appsapp-cli";
import {Observable} from "rxjs/Observable";


/**
 * Generate d class for the AppsappInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-navigation',
    template: `

        <mbsc-hamburger-nav [options]="options" *ngIf="options.type == 'hamburger'">
            <mbsc-nav-item *ngFor="let item of children" [icon]="item.icon" [badge]="item.badge">{{item.name}}
            </mbsc-nav-item>
        </mbsc-hamburger-nav>

        <mbsc-tab-nav [options]="options" *ngIf="options.type == 'tab'">
            <mbsc-nav-item *ngFor="let item of children" [icon]="item.icon" [badge]="item.badge">{{item.name}}
            </mbsc-nav-item>
        </mbsc-tab-nav>

        <mbsc-bottom-nav [options]="options" *ngIf="options.type == 'bottom'">
            <mbsc-nav-item *ngFor="let item of children" [icon]="item.icon" [badge]="item.badge">{{item.name}}
            </mbsc-nav-item>
        </mbsc-bottom-nav>
    `
})

export class AppsappNavigationComponent extends AbstractComponent {


    @Input() model: any;
    icon: string;
    name: string;
    badge: string;
    children: Array<any> = [];
    options: any = {}
    @Input() type: 'hamburger' | 'bottom' | 'tab' = 'hamburger';
    @Input() layout: 'liquid' | 'fixed' = 'liquid';
    @Input() display: 'inline' | 'top' | 'bottom' = 'inline';
    @Input() snap: boolean;
    @Input() menuIcon: string;
    @Input() menuText: string;

    constructor(public appsappModuleProvider: AppsappModuleProvider) {
        super(appsappModuleProvider);
    }


    ngOnInit() {

        let self = this;

        this.options = {
            type: this.type,
            layout: this.layout,
            display: this.display,
            snap: this.snap,
            menuIcon: this.menuIcon,
            menuText: this.menuText
        };


        if (this.model) {
            Object.keys(this.model).forEach((property) => {
                if (property.substr(0, 1) !== "_") {

                    if (this.model.getMetadataValue(property, 'hasIcon')) {
                        this.model.watch(property, (value) => {
                            self.icon = value;
                        })
                    }
                    if (this.model.getMetadataValue(property, 'hasName')) {
                        this.model.watch(property, (value) => {
                            self.name = value;
                        })
                    }
                    if (this.model.getMetadataValue(property, 'hasBadge')) {
                        this.model.watch(property, (value) => {
                            self.badge = value;
                        })
                    }

                    if (this.model.getMetadataValue(property, 'isList')) {

                        var constructor = this.model.getMetadataValue(property, 'isList');
                        var hasNavigationElements = false;
                        var tempModel = new constructor();

                        Object.keys(tempModel).forEach((p) => {
                            if (!hasNavigationElements && property.substr(0, 1) !== "_") {
                                if (tempModel.getMetadataValue(p, 'hasIcon') && tempModel.getMetadataValue(p, 'hasName') && tempModel.getMetadataValue(p, 'hasBadge')) {
                                    hasNavigationElements = true;
                                }
                            }
                        });

                        this.model.watch(property, (value) => {
                            self.children = value;
                        })


                    }


                }
            });
        }

    }


}

