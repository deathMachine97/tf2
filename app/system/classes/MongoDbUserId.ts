import {UserDbId} from './UserDbId';

export class MongoDbUserId extends UserDbId {
    constructor(props: any) {
        super(props);
    }

    getId(): number {
        return parseInt(super.getId())
    }
}