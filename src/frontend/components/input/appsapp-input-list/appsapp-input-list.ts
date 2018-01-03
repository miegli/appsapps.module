import {Component, Output} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";
import {PersistableModel} from "appsapp-cli";

/**
 * Generated class for the AppsappInputSelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input-list',
    template: `

        <mbsc-listview #mbscInstance="mobiscroll">
            <mbsc-listview-item *ngFor="let item of _ngModelGettter | async" [id]="item.__uuid">
                <appsapp-input [model]="item"></appsapp-input>
            </mbsc-listview-item>
        </mbsc-listview>

    `
})
export class AppsappInputListComponent extends AppsappInputAbstractComponent {

    @Output() options: any = [];

    afterInit(config) {

        this.updateConfig();

    }

    reCalculateAfterSorting() {

        let self = this;

        if (self.mbsc && self.mbsc.element !== undefined && self.mbsc.element) {

            let valueAsObject = {};
            let valueSorted = [];
            let value = self.model.getPropertyValue(self.property, true);
            if (typeof value !== 'object' && value.length == undefined) {
                value = [];
            }

            value.forEach((item) => {
                valueAsObject[item.__uuid] = item;
            });

            for (let i = 0; i < self.mbsc.element.children.length; i++) {
                if (self.mbsc.element.children.item(i)) {
                    valueSorted.push(valueAsObject[self.mbsc.element.children.item(i).getAttribute('data-id')]);
                }
            }
            if (valueSorted.length) {
                self.model.update(self.property, valueSorted).setProperty(self.property, valueSorted);
            }
        }

        console.log(self.model);

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
            sortable: {handle: 'right'}, striped: false, stages: [{
                percent: -25,
                color: 'red',
                icon: 'remove',
                text: 'Delete',
                confirm: false,
                disabled: !this.model.getMetadataValue(this.property, 'min') || this.model.getMetadataValue(this.property, 'min') < value.length ? false : true,
                action: (event, inst) => {
                    this.removeItem(event.index);
                    return false;
                }
            },
                {
                    percent: 25,
                    color: 'green',
                    icon: 'plus',
                    text: '',
                    undo: false,
                    disabled: !this.model.getMetadataValue(this.property, 'max') || this.model.getMetadataValue(this.property, 'max') > value.length ? false : true,
                    action: (event, inst) => {
                        this.addItem();
                    }
                }]
        });


    }




    ngAfterContentInit() {

        if (this.model.getMetadataValue(this.property, 'min')) {
            for (let i = 0; i < this.model.getMetadataValue(this.property, 'min'); i++) {
                this.addItem();
            }
        }

    }

    /**
     * remove by uuid or index
     * @param uuid
     */
    removeItem(uuidOrIndex) {

        let value = this.model.getPropertyValue(this.property, true);
        if (typeof value !== 'object' && value.length == undefined) {
            value = [];
        }

        if (!this.model.getMetadataValue(this.property, 'min') || this.model.getMetadataValue(this.property, 'min') < value.length) {
            let index = 0;
            let wasdeleted = false;
            value.forEach((item) => {
                if (!wasdeleted && (item.getUuid() == uuidOrIndex || uuidOrIndex == index)) {
                    value.splice(index, 1);
                    wasdeleted = true;
                }
                index++;
            });
        }

        this.updateConfig();


    }

    addItem() {


        let model = this.model.getMetadataValue(this.property, 'isList'), item = null;

        try {
            item = new model();
        } catch (e) {
            item = new model.constructor();
        }

        let value = this.model.getPropertyValue(this.property, true);
        if (typeof value !== 'object' && value.length == undefined) {
            value = [];
        }


        if (!this.model.getMetadataValue(this.property, 'max') || this.model.getMetadataValue(this.property, 'max') > value.length) {
            if (Object.keys(item).length == 0 || item instanceof PersistableModel == false) {
                item = new PersistableModel();
                item.importDynamicProperties(model);
            }

            item.setUuid();
            value.push(item);

        }

        this.updateConfig();

    }


}
