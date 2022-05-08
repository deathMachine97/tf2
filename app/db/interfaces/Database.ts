export interface Database {
    select(from: string, searchData, limit: number): Promise<any[]>

    insert(from: string, insertData): Promise<boolean>

    update(from: string, searchData, updateData): Promise<boolean>

    delete(from: string, searchData): Promise<boolean>

    closeConnection(): Promise<boolean>
}