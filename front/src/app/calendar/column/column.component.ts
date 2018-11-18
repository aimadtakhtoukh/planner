import {Component, Input, OnInit} from '@angular/core';
import {EntryService} from "../../services/repository/entry.service";
import {DateUtilsService} from "../../services/date-utils.service";
import {User} from "../../services/model/user";
import {Moment} from 'moment';
import {ColumnModel} from "../../services/model/columnModel";
import {Entry} from "../../services/model/entry";
import {CurrentUserService} from "../../services/currentUser.service";

@Component({
    selector: 'column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
    @Input() user : User;
    @Input() selectableDays : Array<Moment>;

    entries: ColumnModel[] = [];

    constructor(
        private entryService : EntryService,
        private currentUserService : CurrentUserService
    ) { }

    ngOnInit() {
        this.entryService
            .getForUser(this.user.id, DateUtilsService.today(), DateUtilsService.nextWeekSunday())
            .subscribe(
                (entries : Entry[]) => {
                    this.entries = entries.map(e => new ColumnModel(e, false));
                }
            )
    }

    getEntryFromDate(date : string) {
        let entry : ColumnModel =  this.entries.filter(c => c.entry.date === date)[0];
        if (entry === undefined) {
            // Si l'entrée n'est pas définie, on en crée un faux, et on l'ajoute aux entrées existantes, pour
            // conserver son état jusqu'à l'envoi de la variable.
            entry = new ColumnModel(
                new Entry({
                    dispo : "UNDEFINED",
                    userId : this.user.id,
                    date : date
                }),
                false
            );
            this.entries.push(entry);
        }
        return  entry;

    };

    getEntriesForUser() {
        return this.entries.filter(
            e => e.entry.userId == this.user.id
        )
    }

    deployColumn() {
        this.getEntriesForUser().forEach(
            e => e.deployed = true
        )
    }

    isColumnDeployed() {
        return this.getEntriesForUser()
            .map(e => e.deployed)
            .some(e => e === true)
    }

    isEditable() {
        return User.areEqual(this.currentUserService.user, this.user);
    }

}