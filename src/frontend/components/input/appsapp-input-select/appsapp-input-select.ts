import {Component, Output} from '@angular/core';
import {AppsappInputAbstractComponent} from "../appsapp-input-abstract";
import {SelectModel} from "../../../models/select";
import * as objectHash from 'object-hash';

/**
 * Generated class for the AppsappInputSelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'appsapp-input-select',
    template: `
        <mbsc-form #mbscInstanceForm="mobiscroll">
            <mbsc-input mbsc-select [error]="validator | async" #mbscInstance="mobiscroll"
                        [ngModel]="_ngModelGettter | async" (ngModelChange)="modelChanges($event)">{{_label}}
            </mbsc-input>
        </mbsc-form>
    `
})
export class AppsappInputSelectComponent extends AppsappInputAbstractComponent {

    @Output() options: any = [];
    select: SelectModel;

    ngAfterContentInit() {

        let self = this;
        let data = this.model.getMetadataValue(this.property, 'isSelect');

        if (data) {

            if (data.options && typeof data.options == 'object') {
                this.options = data.options;
            }

            if (data.source) {

                this.appsappModuleProvider.new(SelectModel, this.appsappModuleProvider.getPersistenceManager().getHash(data.source.url), {
                    url: data.source.url,
                    mapping: data.source.mapping
                }).loaded().then((select: any) => {

                    select.getOptions().subscribe((options) => {
                        self.options = options;
                        self.mbsc.instance.refresh(options);
                        select.getHashedValues().forEach((v) => {
                            self.model.addHashedValue(v.value,v.hash);
                        });


                        let hashedValues = [];
                        self.model.getPropertyValue(self.property,true).forEach((value) => {
                            hashedValues.push(self.model.setHashedValue(value));
                        });

                        self.update(hashedValues);
                        self.mbsc.instance.setVal(hashedValues,false,true)


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
