import 'mocha';
import {MongoDb} from "../../app/helper/classes/MongoDb";
import { assert, expect } from "chai"


describe('MongoDbClass test', () => {
    it('Initial Connection', async () => {
        let result = false;
        try {
            const mongoDb = await MongoDb.getInstance();
            await mongoDb.closeConnection();
            result = true;
        } catch (exception) {
            console.log(exception)
        }
        expect(result).is.equal(true);
    });

    it('Run request', async () => {
        const mongoDb = await MongoDb.getInstance();
        const result = await mongoDb.doRequest(async function (connection:any, db:any) {
            const collection = db.collection('category');
            let result: any = null;
            await collection.find({}).toArray().then((expenses: any) => {
                result = expenses;
            });
            await connection.close();
            return result;
        });
        expect(result).is.instanceOf(Array);
    });
})
