import 'mocha';
import {expect} from "chai"
import {MongoDbAdapter} from '../../../app/db/classes/MongoDbAdapter'
import {Config} from "../../../sys/classes/Config";
import {DatabaseSingleton} from '../../../app/db/classes/DatabaseSingleton'


describe('DatabaseFactory test', () => { // the tests container

    const mongoDb = new MongoDbAdapter();
    it('Test init connection', async () => {
        var result = null;
        try {
            const uri = Config.getInstance().get('uri');
            const connection = await mongoDb.initConnection(uri);
            result = true
        } catch (e) {
            result = false;
        }
        expect(result).is.true;
    });


    it('Test select request', async () => {
        const uri = Config.getInstance().get('uri');
        await mongoDb.initConnection(uri);
        const result = await mongoDb.select('plan', {}, NaN);
        expect(result).is.instanceOf(Array);
    });


})