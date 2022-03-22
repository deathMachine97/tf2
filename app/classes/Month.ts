import { Plan } from './Plan';
import { Months } from '../enums/Months'
import { Plan as PlanType } from '../../app/interfaces/Plan'

export class Month {
    year: string
    month: Months

    constructor(year: string, month: Months) {
        this.year = year;
        this.month = month;
    }

    getExpense() {
    }

    getPlan(): PlanType {
        const plan = new Plan();
        return plan.getMonthlyPlan(this.year, this.month);
    }
}