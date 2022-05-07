import {Months} from '../enums/Months'
import {MonthPlan} from '../interfaces/MonthPlan'
import {Plan as PlanType} from '../interfaces/Plan'
import {YearPlan as YearPlanType} from '../interfaces/YearPlan'
import {DatabaseSingleton} from "../../db/classes/DatabaseSingleton";
import {Config} from "../../../sys/classes/Config";


export class Plan {
    plan: YearPlanType
    static instance: Plan

    private constructor() {
        this.plan = {
            '2021': {
                '1': {'test': 2000},
                '2': {'test': 20, 'test2': 123},
                '3': {'test': 20},
                '4': {'test': 20},
                '5': {'test': 200},
                '6': {'test': 600},
                '7': {'test': 13},
                '8': {'test': 2352},
                '9': {'test': 24},
                '10': {'test': 87},
                '11': {'test': 16},
                '12': {'test': 92},
            }
        }
    }

    static async getInstance() {
        if (!Plan.instance) {
            const new_plan = await Plan.getPlanFromDb();
            Plan.instance = new Plan();
            Plan.instance.plan = (new_plan as YearPlanType);
        }
        return Plan.instance;
    }

    static async getPlanFromDb() {
        const database = await DatabaseSingleton.getInstance();
        const user_id = Config.getInstance().get('user_id');
        const plans = await database.select('plan', {user_id: user_id}, NaN);

        const new_plan = {};
        plans.forEach((each: any) => {
            const year = each.year;
            const month = each.month;
            const plan = each.plan;
            new_plan[year] = year in new_plan ? new_plan[year] : {};
            new_plan[year][month] = each.plan;
        });
        return new_plan;
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