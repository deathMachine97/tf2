import 'mocha';
import {expect} from "chai"
import {Config} from "../../../../sys/classes/Config";
import {ShowLogsCommand} from "../../../../app/helper/classes/commands/ShowLogsCommand";
import {MongoDbUserId} from "../../../../app/system/classes/MongoDbUserId";


describe('Show Logs Command Test', () => { // the tests container
    const testUser = new MongoDbUserId(Config.getInstance().get('user_id'));
    const testMonth = 1;
    const testYear = 2022;
    it('should be true ', async function () {
        const command = new ShowLogsCommand({
            user: testUser,
            month: testMonth,
            year: testYear
        });
        const result = await command.run();
        expect(result).is.true;
    });
})
