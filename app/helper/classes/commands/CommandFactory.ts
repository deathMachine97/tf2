import {GetExpenseCommand} from "./GetExpenseCommand";
import {MongoDbUserId} from "../../../system/classes/MongoDbUserId";
import {ShowLogsCommand} from "./ShowLogsCommand";

export class CommandFactory {
    static create(userId, month, year, log, grep) {
        const user = new MongoDbUserId(userId);
        if (log) {
            return new ShowLogsCommand({
                user: user,
                month: month,
                year: year,
                grep: grep
            });
        } else {
            return new GetExpenseCommand({
                user: user,
                month: month,
                year: year
            })
        }
    }
}