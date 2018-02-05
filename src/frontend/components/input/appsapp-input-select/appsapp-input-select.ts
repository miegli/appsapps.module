import {Component, Output} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";
import {SelectModel} from "../../../models/select";
import * as objectHash from 'object-hash';
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
    
            <mbsc-input mbsc-select [error]="validator | async" #mbscInstance="mobiscroll"
                        [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}
            </mbsc-input>
     
    `
})
export class AppsappInputSelectComponent extends AppsappInputAbstractComponent {

    @Output() options: any = [];
    select: SelectModel;
    isUnique: boolean = false;

    /**
     * set options
     * @param values
     */
    setOptions(values?) {

        let self = this;
        let optionsPreProcessed = [];
        let currentSelectedOptions = {};
        let value = values === undefined ? this.model.getParent().getPropertyValue(this.parentProperty) : values;

        if (value && value.length) {
            value.forEach(() => {

                value.forEach((option) => {
                    if (option instanceof PersistableModel && option.getUuid() !== self.model.getUuid()) {
                        option.getPropertyValue(self.property).forEach((option) => {
                            currentSelectedOptions[option] = true;
                        })
                    }

                });


            });
        }

        let clonedOptions = JSON.parse(JSON.stringify(self.options));
        clonedOptions.forEach((option) => {
            if (currentSelectedOptions[option.value] !== undefined) {
                option.disabled = true;
            }
            optionsPreProcessed.push(option);
        });

        self.mbsc.instance.refresh(optionsPreProcessed);

    }

    applyOptionsPostprocess() {

        let self = this;

        if (this.isUnique) {
            this.model.getParent().getChangesWithCallback((event) => {
                if (event.property == self.parentProperty) {
                    self.setOptions(event.value);
                }
            });
        }
    }

    ngAfterContentInit() {

        let self = this;
        let data = this.model.getMetadataValue(this.property, 'isSelect');

        if (this.parentPropertyMetadata) {
            this.isUnique = this.model.getMetadataValue(null, 'isList', this.parentPropertyMetadata, 'uniqueItems');
        }

        self.applyOptionsPostprocess();

        if (data) {

            if (data.options && typeof data.options == 'object') {
                this.options = data.options;
            }

            if (data.source) {

                this.appsappModuleProvider.new(SelectModel, this.appsappModuleProvider.getPersistenceManager().getHash(data.source.url), {
                    url: data.source.url,
                    mapping: data.source.mapping,
                    parent: self.model,
                    parentProperty: self.property
                }).loaded().then((select: any) => {

                    select.getOptions().subscribe((options) => {

                        self.options = options;
                        if (self.isUnique) {
                            self.setOptions();
                        } else {
                            self.mbsc.instance.refresh(options);
                        }
                        select.getHashedValues().forEach((v) => {
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



                    });
                });

            }

        }

    }

    /**
     *
     * @param {ConfigModel} config
     */
    afterInit(config) {

        let self = this;

        let groups = {};
        if (typeof this.options.length == 'number') {
            this.options.forEach((item) => {
                if (item.group !== undefined) {
                    groups[item.group] = true;
                }
            });
        }


        this.setMbscOption({
            group: self.options.length <= 20 ? {
                groupWheel: Object.keys(groups).length > 5,
                header: Object.keys(groups).length > 0,
                clustered: Object.keys(groups).length > 2
            } : null,
            filter: self.options.length > 20,
            display: 'center',
            data: self.options,
            select: self.model.getMetadataValue(self.property, 'arrayMaxSize') ? self.model.getMetadataValue(self.property, 'arrayMaxSize') : (self.model.isArray(self.property) ? 'multiple' : 'single')
        });

    }


}
