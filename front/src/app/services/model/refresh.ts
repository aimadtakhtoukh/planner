export class RefreshType {
  access_token : string;
  refresh_token : string;
  expires_in : number;

  constructor(values : Object = {}) {
    Object.assign(this, values)
  }
}