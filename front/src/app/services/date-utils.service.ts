import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from "moment";

@Injectable()
export class DateUtilsService {

    constructor() { }

    static today() : Moment {
        return moment().locale('fr');
    }

    static nextWeekSunday() : Moment {
        return this.today().clone().add(7, 'days').endOf("isoWeek")
    }

    static getEditedDateRange() : Moment[] {
        return DateUtilsService.getRangeBetween(this.today(), this.nextWeekSunday());
    }

    static getRangeBetween(first : moment.Moment, last : moment.Moment) : Moment[] {
        let now = first.clone();
        let result = [];
        while (now.isSameOrBefore(last)) {
            result.push(now.clone());
            now.add(1, 'days')
        }
        return result;
    };

}