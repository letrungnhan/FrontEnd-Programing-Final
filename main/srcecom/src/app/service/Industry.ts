export class Industry {
  private _industryName: string;
  private _industryID: string;

  constructor(industryName: string, industryID: string) {
    this._industryName = industryName;
    this._industryID = industryID;
  }

  get industryName(): string {
    return this._industryName;
  }

  set industryName(value: string) {
    this._industryName = value;
  }

  get industryID(): string {
    return this._industryID;
  }

  set industryID(value: string) {
    this._industryID = value;
  }
}
