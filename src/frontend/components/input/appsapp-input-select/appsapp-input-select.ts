import {Component, Output} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";
import {SelectModel} from "../../../models/select";
import {PersistableModel} from "appsapp-cli";


/**
 * Generated class for the AppsappInputSelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input-select',
    template: `
        <mbsc-input [hidden]="selectoptions.length == 0" mbsc-select [error]="validator | async"
                    #mbscInstance="mobiscroll"
                    [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}
        </mbsc-input>

    `
})
export class AppsappInputSelectComponent extends AppsappInputAbstractComponent {

    selectoptions: any = [];
    select: SelectModel;
    isUnique: boolean = false;

    /**
     * set selectoptions
     * @param values
     */
    setOptions(values?) {

        let self = this;
        let selectoptionsPreProcessed = [];
        let currentSelectedselectoptions = {};
        let value = values === undefined ? this.model.getParent().getPropertyValue(this.parentProperty) : values;

        if (value && value.length) {
            value.forEach(() => {

                value.forEach((option) => {
                    if (option instanceof PersistableModel && option.getUuid() !== self.model.getUuid()) {
                        option.getPropertyValue(self.property).forEach((option) => {
                            currentSelectedselectoptions[option] = true;
                        })
                    }

                });


            });
        }

        let clonedselectoptions = JSON.parse(JSON.stringify(self.selectoptions));
        clonedselectoptions.forEach((option) => {
            if (currentSelectedselectoptions[option.value] !== undefined) {
                option.disabled = true;
            }
            selectoptionsPreProcessed.push(option);
        });

        self.mbsc.instance.refresh(selectoptionsPreProcessed);

    }

    applyselectoptionsPostprocess() {

        let self = this;

        if (this.isUnique) {
            this.model.getParent().getChangesWithCallback((event) => {
                if (event.property == self.parentProperty) {
                    self.setOptions(event.value);
                }
            });
        }
    }

    init(config) {

        let self = this;
        let data = this.model.getMetadataValue(this.property, 'isSelect');

        if (this.parentPropertyMetadata) {
            this.isUnique = this.model.getMetadataValue(null, 'isList', this.parentPropertyMetadata, 'uniqueItems');
        }

        self.applyselectoptionsPostprocess();


        if (data) {

            if (data.options && typeof data.options == 'object') {
                this.selectoptions = data.options;
            }

            if (data.source) {

                self.select = this.appsappModuleProvider.new(SelectModel, this.appsappModuleProvider.getPersistenceManager().getHash(data.source.url));

                self.select.loaded().then((m) => {

                    self.select.setProperty('mapping', data.source.mapping);
                    self.select.setProperty('parent',self.model);
                    self.select.setProperty('parentProperty', this.property);
                    self.select.setProperty('url', data.source.url);
                    self.select.init();

                    self.select.getOptions().subscribe((selectoptions) => {

                        self.selectoptions = selectoptions;
                        if (self.isUnique) {
                            self.setOptions();
                        } else {
                            self.mbsc.instance.refresh(selectoptions);
                        }
                        self.select.getHashedValues().forEach((v) => {
                            self.model.addHashedValue(v.value, v.hash);
                        });

                        let hashedValues = [];
                        if (self.model.getPropertyValue(self.property, true)) {
                            self.model.getPropertyValue(self.property, true).forEach((value) => {
                                hashedValues.push(self.model.setHashedValue(value));
                            });
                        }

                        self.update(hashedValues);
                        self.mbsc.instance.setVal(hashedValues, false, true);
                        self.select.save().subscribe();


                    });


                })


            }

        }


        let groups = {};
        if (this.selectoptions && typeof this.selectoptions.length == 'number') {
            this.selectoptions.forEach((item) => {
                if (item.group !== undefined) {
                    groups[item.group] = true;
                }
            });
        }


        if (this.model) {

            const options = this.model.getMetadataValue(this.property, 'isSelect');

            this.setMbscOption({
                group: self.selectoptions.length <= 20 ? {
                    groupWheel: Object.keys(groups).length > 5,
                    header: Object.keys(groups).length > 0,
                    clustered: Object.keys(groups).length > 2
                } : null,
                filter: self.selectoptions.length > 20,
                display: options && options.display ? options.display : (config.getOs() !== 'desktop' ? 'bottom' : 'center'),
                data: self.selectoptions,
                select: self.model.getMetadataValue(self.property, 'arrayMaxSize') ? self.model.getMetadataValue(self.property, 'arrayMaxSize') : (self.model.isArray(self.property) ? 'multiple' : 'single')
            });

        }

    }


}
