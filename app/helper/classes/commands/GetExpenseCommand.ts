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

            const groupedExpense = {};
            expense.forEach((expense: any) => {
                const eachAmount = parseInt(expense['raw_text']
                    .split(' ')[0]);
                const eachCategory = expense['raw_text']
                    .split(' ')[1];


                groupedExpense[eachCategory] = groupedExpense[eachCategory] ?
                    groupedExpense[eachCategory] : 0;

                groupedExpense[eachCategory] += eachAmount;
            });

            const result = {};
            for (const categoryName in groupedExpense) {
                const plannedExpense = plan[categoryName] ? plan[categoryName] : 0;
                result[categoryName] = groupedExpense[categoryName] + '/'
                    + plannedExpense;
            }

            for (const categoryName in plan) {
                if (!result.hasOwnProperty(categoryName)) {
                    result[categoryName] = '0/' + plan[categoryName];
                }
            }

            const sumExpense = expense.map((each: any) => each['amount'])
                .reduce((a: number, b: number) => a + b);
            const sumPlannedExpense = Object.values(plan)
                .map((each: any) => each['amount'])
                .reduce((a: number, b: number) => {
                    return a + b
                }, 0);

            groupedExpense['total'] = (sumPlannedExpense - sumExpense) + '/' + sumPlannedExpense
            return groupedExpense;

        } catch (e) {
            throw e;
        }
    }
}