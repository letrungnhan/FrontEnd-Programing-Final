export class Language {
  private _languageName: string;
  private _languageID: number


  constructor(categoryName: string, categoryID: number) {
    this._languageName = categoryName;
    this._languageID = categoryID;
  }

  get languageName(): string {
    return this._languageName;
  }

  set languageName(value: string) {
    this._languageName = value;
  }

  get languageID(): number {
    return this._languageID;
  }

  set languageID(value: number) {
    this._languageID = value;
  }
}
