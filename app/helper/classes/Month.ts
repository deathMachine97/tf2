import {Plan} from './Plan';
import {Months} from '../enums/Months'
import {Plan as PlanType} from '../../../app/helper/interfaces/Plan'
import {Moment} from 'moment';
import {UserDbId} from '../../system/interfaces/UserDbId';
import {DatabaseSingleton} from "../../db/classes/DatabaseSingleton";

export class Month {
    year: string
    month: Months
    momentDate: Moment
    userId: UserDbId

    constructor(year: string, month: Months, userId: UserDbId) {
        this.year = year;
        this.month = month;
        this.userId = userId;

        const MomentJs = require('moment'); // require
        this.momentDate = MomentJs().year(parseInt(year)).month(parseInt(this.month) - 1)
    }

    async getPlan(): Promise<PlanType> {
        const plan = await Plan.getInstance();
        return plan.getMonthlyPlan(this.year, this.month);
    }


    getYearNumber(): number {
        return parseInt(this.year);
    }

    getMonthNumber(): number {
        return parseInt(this.month)
    }

    async getExpense(): Promise<Object[]> {
        const requestBody = {
            'created': {
                '$gt': this.getFirstDate(),
                '$lt': this.getLastDate()
            },
            'user_id': this.userId.getId()
        }
        const database = await DatabaseSingleton.getInstance();
        return await database.select('expense', requestBody, NaN);
    }

    toDate(): Date {
        return this.momentDate.toDate();
    }

    getLastDate(): Date {
        return this.momentDate.endOf('month').toDate();
    }

    getFirstDate(): Date {
        return this.momentDate.startOf('month').toDate();
    }

}