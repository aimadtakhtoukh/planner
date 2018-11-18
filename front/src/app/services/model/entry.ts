export class Entry {
    id : number;
    userId : number;
    date : string;
    dispo : string;

    constructor(values : Object = {}) {
        Object.assign(this, values)
    }
}
