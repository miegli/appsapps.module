import {Component, Output} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";
import {PersistableModel} from "appsapp-cli";
import {AppsappModuleProvider} from "../../../providers/appsapp-module-provider";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the AppsappInputSelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input-list',
    template: `
       

    `
})
export class AppsappInputListComponent extends AppsappInputAbstractComponent {

    @Output() options: any = [];
    @Output() parentPropertyMetadata: any = null;
    @Output() parentProperty: any = null;


    init(config) {

        this.parentPropertyMetadata = this.model.getMetadata(this.property);
        this.parentProperty = this.property;

        this.updateConfig();

    }

    reCalculateAfterSorting() {

        let self = this;




    }

    updateConfig() {


        let self = this, value = this.model.getPropertyValue(this.property, true);
        if (typeof value !== 'object' && value.length == undefined) {
            value = [];
        }

        this.setMbscOption({
            onSortUpdate: function (event, inst) {
                self.reCalculateAfterSorting();
            },
            fillAnimation: false,
            sortable: {handle: 'right'}, striped: false, stages: [{
                percent: -10,
                color: 'red',
                icon: 'remove',
                text: this.model.getMessage('delete'),
                confirm: false,
                disabled: !this.model.getMetadataValue(this.property, 'arrayMinSize') || this.model.getMetadataValue(this.property, 'arrayMinSize') < value.length ? false : true,
                action: (event, inst) => {
                    this.removeItem(event.index);
                    return false;
                }
            },
                {
                    percent: 10,
                    color: 'green',
                    icon: 'plus',
                    text: this.model.getMessage('add'),
                    undo: false,
                    disabled: !this.model.getMetadataValue(this.property, 'arrayMaxSize') || this.model.getMetadataValue(this.property, 'arrayMaxSize') > value.length ? false : true,
                    action: (event, inst) => {
                        this.addItem();
                    }
                }]
        });


    }


    ngAfterContentInit() {

        if (this.model.getMetadataValue(this.property, 'arrayMinSize')) {

            for (let i = this.model.getPropertyValue(this.property, true).length; i < this.model.getMetadataValue(this.property, 'arrayMinSize'); i++) {
                this.addItem();
            }

        }

    }

    /**
     * remove by uuid or index
     * @param uuid
     */
    removeItem(uuidOrIndex) {

        let self = this, value = this.model.getPropertyValue(this.property, true);
        if (typeof value !== 'object' && value.length == undefined) {
            value = [];
        }

        if (!this.model.getMetadataValue(this.property, 'arrayMinSize') || this.model.getMetadataValue(this.property, 'arrayMinSize') < value.length) {
            let index = 0;
            let wasdeleted = false;
            value.forEach((item) => {
                if (!wasdeleted && (item.getUuid() == uuidOrIndex || uuidOrIndex == index)) {
                    self.model.remove(this.property, item.getUuid());
                    wasdeleted = true;
                }
                index++;
            });
        }

        this.updateConfig();


    }

    addItem() {

        let value = this.model.getPropertyValue(this.property, true);

        if (typeof value !== 'object' && value.length == undefined) {
            value = [];
        }

        if (!this.model.getMetadataValue(this.property, 'arrayMaxSize') || this.model.getMetadataValue(this.property, 'arrayMaxSize') > value.length) {
            this.model.add(this.property);
        }

        this.model.setProperty(this.property, this.model.getPropertyValue(this.property, true));
        this.updateConfig();

    }


}
