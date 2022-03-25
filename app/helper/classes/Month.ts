import {Plan} from './Plan';
import {Months} from '../enums/Months'
import {Plan as PlanType} from '../../../app/helper/interfaces/Plan'
import {MongoDb} from "./MongoDb";

export class Month {
    year: string
    month: Months

    constructor(year: string, month: Months) {
        this.year = year;
        this.month = month;
    }

    getPlan(): PlanType {
        const plan = new Plan();
        return plan.getMonthlyPlan(this.year, this.month);
    }


    getYearNumber() {
        return parseInt(this.year);
    }

    getMonthNumber() {
        return parseInt(this.month)
    }

    async getExpense() {
        const mongoDb = await MongoDb.getInstance();

        return await mongoDb.doRequest(async function (connection: any, db: any) {
            const collection = db.collection('expense');
            let result: any = null;
            await collection.find({}).toArray().then((expenses: any) => {
                result = expenses;
            });
            await connection.close();
            return result;
        });
    }

}