import {Component, Input} from "@angular/core";
import * as moment from 'moment';
import {EntryService} from "../../../../services/repository/entry.service";
import {ColumnModel} from "../../../../services/model/columnModel";
import {Entry} from "../../../../services/model/entry";

@Component({
    selector: 'dispo-picker',
    templateUrl: './dispo-picker.component.html',
    styleUrls: ['./dispo-picker.component.scss']
})

export class DispoPickerComponent {
    @Input() model : ColumnModel;

    constructor(
        private entryService : EntryService
    ) {}

    onButtonClick(dispo : string) {
        let dayMoment = moment(this.model.entry.date, "DD/MM/YYYY");
        this.entryService.getForUser(this.model.entry.userId, dayMoment, dayMoment)
            .subscribe((entries : Entry[]) => {
                if (entries.length == 1) {
                    this.model.entry.id = entries[0].id
                }
                this.model.entry.dispo = dispo;
                this.entryService.updateEntry(this.model.entry);
                this.model.deployed = false;
            }
        );
    }

}