import {UserDbId as UserDbIdInterface} from '../interfaces/UserDbId';

export class UserDbId implements UserDbIdInterface {
    id: any;

    constructor(id: any) {
        this.id = id;
    }

    getId(): any {
        return this.id;
    }
}