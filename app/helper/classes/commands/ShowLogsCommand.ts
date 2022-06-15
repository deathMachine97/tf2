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
            const result = await this.month.getExpense();
            if (this.params.grep) {
                return result.filter((each: any) => {
                    return String(each.raw_text).toLowerCase().indexOf(this.params.grep) != -1;
                });
            }
            // return result;
        } catch (e) {
            throw e;
        }
    }
}