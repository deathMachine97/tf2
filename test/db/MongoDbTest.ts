import 'mocha';
import {expect} from "chai"
import {MongoDb} from '../../app/db/classes/MongoDb'
import {Config} from "../../sys/classes/Config";


describe('DatabaseFactory test', () => { // the tests container

    const mongoDb = new MongoDb();
    it('Test init connection', async () => {
        const uri = Config.getInstance().get('uri');
        const connection = await mongoDb.initConnection(uri);
        expect(connection).is.not.undefined;
    });



    it('Test select request', async () => {
        const uri = Config.getInstance().get('uri');
        const connection = await mongoDb.initConnection(uri);
    });


})