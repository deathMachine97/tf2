import {Database as DatabaseInterface} from '../interfaces/Database'
import {Database as AbstractDatabase} from '../classes/Database'
import {Config} from "../../../sys/classes/Config";
import {MongoDbAdapter} from "./MongoDbAdapter";

export class DatabaseSingleton implements DatabaseInterface {
    private static instance: DatabaseSingleton
    private database: AbstractDatabase;


    static async getInstance(): Promise<DatabaseInterface> {
        if (!DatabaseSingleton.instance) {
            const adapter = await DatabaseSingleton
                .buildAdapter(Config.getInstance().get('uri'));
            DatabaseSingleton.instance = new DatabaseSingleton(adapter);
        }
        return DatabaseSingleton.instance;
    }

    private static async buildAdapter(uri: string): Promise<AbstractDatabase> {
        if (Config.getInstance().get('db_type') == 'mongo') {
            const mongoDb = new MongoDbAdapter();
            await mongoDb.initConnection(uri);
            return mongoDb;
        } else {
            throw new Error('Нет подходящего адаптера для БД');
        }
    }

    private constructor(database: AbstractDatabase) {
        this.database = database;
    }

    async select(from: string, searchData, limit: number): Promise<any[]> {
        return this.database.select(from, searchData, limit)
    }

    async insert(from: string, insertData): Promise<boolean> {
        return this.database.insert(from, insertData);
    }

    async update(from: string, searchData, updateData): Promise<boolean> {
        return this.database.update(from, searchData, updateData)
    }

    async delete(from: string, searchData): Promise<boolean> {
        return this.database.delete(from, searchData)
    }

    async closeConnection() {
        await this.database.closeConnection();
        return true;
    }
}