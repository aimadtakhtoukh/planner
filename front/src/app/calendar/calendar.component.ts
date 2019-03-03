import {Component, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {UserService} from "../services/repository/user.service";
import {DateUtilsService} from "../services/date-utils.service";
import {CurrentUserService} from "../services/currentUser.service";
import {UserWithEntries} from "../services/model/userWithEntries";
import {EntryService} from "../services/repository/entry.service";

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    selectableDays: Array<Moment>;
    usersWithEntries: UserWithEntries[] = [];

    constructor (
        private userService : UserService,
        private entryService : EntryService,
        private currentUserService : CurrentUserService
    ) {}

    ngOnInit(): void {
        this.selectableDays = DateUtilsService.getEditedDateRange();
        this.userService.getSelf().subscribe(user => {
            if (user) {
                this.currentUserService.loginWith(user);
            }
          this.entryService
            .getAllByUsers(DateUtilsService.today(), DateUtilsService.nextWeekSunday())
            .subscribe(
              (userWithEntries : UserWithEntries[]) => {
                this.usersWithEntries = userWithEntries;
              }
            )
        });
    };
}