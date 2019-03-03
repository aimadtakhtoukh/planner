import {User} from "./user";
import {Entry} from "./entry";

export class UserWithEntries {
  user : User;
  entries : Entry[];

  constructor(values : Object = {}) {
    Object.assign(this, values)
  }
}
