import {Commands} from "./Commands";
import {Month} from "../Month";

export class GetExpenseCommand extends Commands {
    month: Month;

    async init(): Promise<void> {
        this.month = new Month(
            this.params.year, this.params.month, this.params.user);
        return Promise.resolve(undefined);
    }

    async doStuff(): Promise<any> {
        try {
            const expense = await this.month.getExpense();
            const plan = await this.month.getPlan();

            const result = {};
            expense.forEach((expense: any) => {
                const eachAmount = parseInt(expense['raw_text']
                    .split(' ')[0]);
                const eachCategory = expense['raw_text']
                    .split(' ')[1];


                const plannedExpense = plan[eachCategory] ? plan[eachCategory] : 0;

                result[eachCategory] = result[eachCategory] ?
                    result[eachCategory] : 0;

                result[eachCategory] += eachAmount + '/' + plannedExpense;
            });

            const sumExpense = expense.map((each: any) => each['amount'])
                .reduce((a: number, b: number) => a + b);
            const sumPlannedExpense = Object.values(plan)
                .map((each: any) => each['amount'])
                .reduce((a: number, b: number) => a + b);


        } catch (e) {
            throw e;
        }
    }
}