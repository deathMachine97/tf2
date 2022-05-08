import {Database as DatabaseInterface} from '../interfaces/Database'

export abstract class Database implements DatabaseInterface {
    abstract initConnection(uri: string): Promise<any>

    abstract select(from: string, searchData, limit: number): Promise<any[]>

    abstract insert(from: string, insertData): Promise<boolean>

    abstract update(from: string, searchData, updateData): Promise<boolean>

    abstract delete(from: string, searchData): Promise<boolean>

    abstract closeConnection(): Promise<boolean>
}