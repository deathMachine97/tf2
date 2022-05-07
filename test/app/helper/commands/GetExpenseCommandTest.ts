import 'mocha';
import {expect} from "chai"
import {Config} from "../../../../sys/classes/Config";
import {MongoDbUserId} from "../../../../app/system/classes/MongoDbUserId";
import {GetExpenseCommand} from "../../../../app/helper/classes/commands/GetExpenseCommand";


describe('Show Logs Command Test', () => { // the tests container
    const testUser = new MongoDbUserId(Config.getInstance().get('user_id'));
    const testMonth = 1;
    const testYear = 2022;

    it('should be true ', async function () {
        const command = new GetExpenseCommand({
            user: testUser,
            month: testMonth,
            year: testYear
        });
        const result = await command.run();
        expect(result).is.true;
    });
})
