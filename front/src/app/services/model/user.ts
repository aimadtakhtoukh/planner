export class User {
    id : number;
    name : string;

    constructor(values : Object = {}) {
        Object.assign(this, values);
    }

    static areEqual(user1 : User, user2 : User) {
        return user1 && user2 && user1.id === user2.id && user1.name === user2.name;
    }
}