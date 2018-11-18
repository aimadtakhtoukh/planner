import {Entry} from "./entry";

export class ColumnModel {
    entry : Entry;
    deployed : boolean;

    constructor(entry : Entry, deployed : boolean) {
        this.entry = entry;
        this.deployed = deployed;
    }
}