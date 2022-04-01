import {Database} from '../interfaces/Database'
import {Config} from "../../../sys/classes/Config";
import {MongoDb} from "./MongoDb";

export class DatabaseSingleton implements Database {
    private static instance: DatabaseSingleton
    private database: Database;


    static async getInstance() {
        if (DatabaseSingleton.instance) {
            return DatabaseSingleton.instance;
        } else {
            const database = await DatabaseSingleton
                .initConnection(Config.getInstance().get('uri'));

            DatabaseSingleton.instance = new DatabaseSingleton(database);
        }
    }

    private static async initConnection(uri: string): Promise<Database> {
        if (Config.getInstance().get('db_type') == 'mongo') {
            const mongoDb = new MongoDb();
            await mongoDb.initConnection(uri);
            return mongoDb;
        }
        return;
    }

    private constructor(database: Database) {
        this.database = database;
    }

    async select(from: string, searchData, limit: number): Promise<any[]> {
        return await this.database.select(from, searchData, limit)
    }

    async insert(from: string, insertData): Promise<boolean> {
        return await this.database.insert(from, insertData);
    }

    async update(from: string, searchData, updateData): Promise<boolean> {
        return await this.database.update(from, searchData, updateData)
    }

    async delete(from: string, searchData): Promise<boolean> {
        return await this.database.delete(from, searchData)
    }
}