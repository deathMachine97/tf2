import { Months } from '../enums/Months'
import { MonthPlan } from '../interfaces/MonthPlan'
import { Plan as PlanType } from '../interfaces/Plan'
import { YearPlan as YearPlanType } from '../interfaces/YearPlan'


export class Plan {
    plan: YearPlanType

    constructor() {
        this.plan = {
            '2021': {
                '01': {'test': 2000},
                '02': {'test': 20, 'test2': 123},
                '03': {'test': 20},
                '04': {'test': 20},
                '05': {'test': 200},
                '06': {'test': 600},
                '07': {'test': 13},
                '08': {'test': 2352},
                '09': {'test': 24},
                '10': {'test': 87},
                '11': {'test': 16},
                '12': {'test': 92},
            }
        }
    }

    getMonthlyPlan(year: string, month: Months): PlanType {
        if (this.plan[year]) {
            const plan = (this.plan[year][month] as PlanType);
            return plan ? plan : {};
        }
        return {}
    }


    getAmountOfTheMonthlyPlan(year: string, month: Months): number {
        const plan = this.getMonthlyPlan(year, month);
        var sum = 0;
        for (const expenseName in plan) {
            sum += plan[expenseName];
        }
        return sum;
    }

    getYearPlan(year: string): MonthPlan {
        return this.plan[year];
    }

    getMonthlyPlanCategories(year: string, month: Months): string[] {
        const plan = this.getMonthlyPlan(year, month)
        return Object.keys(plan);
    }

}