import {DateUtil} from "../../system/classes/DateUtil";
import {Month} from "./Month";
import {MongoDbUserId} from "../../system/classes/MongoDbUserId";
import {Config} from "../../../sys/classes/Config";
import {CommandFactory} from "./commands/CommandFactory";
import {DatabaseSingleton} from "../../db/classes/DatabaseSingleton";

const {ArgumentParser} = require('argparse');

const parser = new ArgumentParser({
    description: 'Argparse example'
});

export class Helper {

    async runCommand() {
        parser.add_argument('-l', '--log', {help: 'show log only', action: 'store_true'})
        parser.add_argument('-m', '--month', {help: 'choose a month', default: DateUtil.getCurrentMonth()});
        parser.add_argument('-y', '--year', {help: 'choose a year', default: DateUtil.getCurrentYear()})
        parser.add_argument('-u', '--user', {help: 'user id', default: Config.getInstance().get('user_id')});

        const {log, month, year, user} = parser.parse_args();

        const command = CommandFactory.create(user, month, year, log);
        const result = await command.run();
        if (result) {
            command.showResult();
        } else {
            command.showError();
        }

        const database = await DatabaseSingleton.getInstance();
        await database.closeConnection()
    }
}