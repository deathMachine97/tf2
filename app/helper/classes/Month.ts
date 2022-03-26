import {Plan} from './Plan';
import {Months} from '../enums/Months'
import {Plan as PlanType} from '../../../app/helper/interfaces/Plan'
import {MongoDb} from "./MongoDb";
import {Moment} from 'moment';
import {UserDbId} from '../../system/interfaces/UserDbId';

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

    getPlan(): PlanType {
        const plan = new Plan();
        return plan.getMonthlyPlan(this.year, this.month);
    }


    getYearNumber(): number {
        return parseInt(this.year);
    }

    getMonthNumber(): number {
        return parseInt(this.month)
    }

    async getExpense(): Promise<Object[]> {
        const mongoDb = await MongoDb.getInstance();
        const firstDate = this.getFirstDate();
        const lastDate = this.getLastDate();
        const user_id = this.userId.getId();

        return await mongoDb.doRequest(async function (connection: any, db: any) {
            const collection = db.collection('expense');
            let result: any = null;
            await collection.find({
                "created": {
                    "$gt": firstDate,
                    "$lt": lastDate
                },
                "user_id": user_id
            }).toArray().then((expenses: any) => {
                result = expenses;
            });
            return result;
        });
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