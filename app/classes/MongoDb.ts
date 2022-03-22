import {Config} from '../../sys/classes/Config';

export class MongoDb {
    static instance: MongoDb;
    connection: any;
    db: any;

    static async getInstance() {
        if (MongoDb.instance) {
            return MongoDb.instance;
        } else {
            return await MongoDb.build();
        }
    }

    private static async build() {
        const connection = await MongoDb.initConnection();
        return new MongoDb(connection)
    }

    private static async initConnection() {
        const {MongoClient} = require('mongodb');

        const uri = Config.getInstance().get('uri');
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        try {
            await client.connect();
            return client;
        } catch (e) {
            console.error(e);
        }
    }

    private constructor(connection: any) {
        if (connection) {
            this.connection = connection;
            this.db = connection.db('tfinance_x');
        }
    }


    public async doRequest(callback: Function) {
        return callback.bind(this)(this.connection, this.db);
    }

    public async closeConnection() {
        this.connection.close();
    }
}