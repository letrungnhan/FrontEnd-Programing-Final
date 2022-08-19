export class Tag {
  private _tagName: string;
  private _tagID: string;

  constructor(tagName: string, tagID: string) {
    this._tagName = tagName;
    this._tagID = tagID;
  }

  get tagName(): string {
    return this._tagName;
  }

  set tagName(value: string) {
    this._tagName = value;
  }

  get tagID(): string {
    return this._tagID;
  }

  set tagID(value: string) {
    this._tagID = value;
  }
}
