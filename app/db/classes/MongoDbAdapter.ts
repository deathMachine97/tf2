import {Config} from "../../../sys/classes/Config";
import {Database} from "./Database";


export class MongoDbAdapter extends Database {

    database: any
    client: any

    async initConnection(uri: string): Promise<any> {
        const {MongoClient} = require('mongodb');

        const client = new MongoClient(uri, {useUnifiedTopology: true});
        try {
            await client.connect();

            this.client = client;
            this.database = client.db(Config.getInstance().get('db_name'));
        } catch (e) {
            throw e;
        }
    }

    async select(from: string, searchData, limit: number): Promise<any[]> {
        const collection = this.database.collection(from);
        let result: any = null;
        await collection.find(searchData).toArray().then((expenses: any) => {
            result = expenses;
        });
        return result;
    }

    async insert(from: string, insertData): Promise<boolean> {
        return;
    }

    async update(from: string, searchData, updateData): Promise<boolean> {
        return;
    }

    async delete(from: string, searchData): Promise<boolean> {
        return;
    }

    async closeConnection() {
        await this.client.close()
        return true;
    }
}