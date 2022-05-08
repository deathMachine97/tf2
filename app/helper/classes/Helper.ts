import {DateUtil} from "../../system/classes/DateUtil";
import {Month} from "./Month";
import {MongoDbUserId} from "../../system/classes/MongoDbUserId";
import {Config} from "../../../sys/classes/Config";

const {ArgumentParser} = require('argparse');

const parser = new ArgumentParser({
    description: 'Argparse example'
});

export class Helper {

    async runCommand() {
        const {log, month, year, user} = parser.add_argument(
            '-l', '--log', {help: 'show log only', action: 'store_true'},
            '-m', '--month', {help: 'choose a month', default: DateUtil.getCurrentMonth()},
            '-y', '--year', {help: 'choose a year', default: DateUtil.getCurrentYear()},
            '-u', '--user', {help: 'user id', default: Config.getInstance().get('user_id')}
        );

        // const command = CommandFactory.create(user, month, year, log);
        // const result = await command.run();
        // if (result) {
        //     command.showResult();
        // } else {
        //     command.showError();
        // }
    }
}