import {Commands} from "./Commands";
import {Month} from "../Month";

export class ShowLogsCommand extends Commands {
    month: Month;

    async init(): Promise<void> {
        this.month = new Month(
            this.params.year, this.params.month, this.params.user);
        return Promise.resolve(undefined);
    }

    async doStuff(): Promise<any> {
        try {
            return await this.month.getExpense();
        } catch (e) {
            throw e;
        }
    }
}