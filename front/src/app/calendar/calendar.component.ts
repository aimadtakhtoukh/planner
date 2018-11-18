import {Component, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {UserService} from "../services/repository/user.service";
import {User} from "../services/model/user";
import {DateUtilsService} from "../services/date-utils.service";
import {CurrentUserService} from "../services/currentUser.service";

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    selectableDays: Array<Moment>;
    users: User[] = [];

    constructor (
        private userService : UserService,
        private currentUserService : CurrentUserService
    ) {}

    ngOnInit(): void {
        this.selectableDays = DateUtilsService.getEditedDateRange();
        this.userService.getSelf().subscribe(user => {
            if (user) {
                this.currentUserService.loginWith(user);
            }
            this.userService.getAll()
                .subscribe(
                    (users) => {
                        this.users = users;
                    }
                );
        });
    };
}