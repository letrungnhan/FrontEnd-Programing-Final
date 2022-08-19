export class Category {
  private _categoryName: string;
  private _categoryID: number


  constructor(categoryName: string, categoryID: number) {
    this._categoryName = categoryName;
    this._categoryID = categoryID;
  }

  get categoryName(): string {
    return this._categoryName;
  }

  set categoryName(value: string) {
    this._categoryName = value;
  }

  get categoryID(): number {
    return this._categoryID;
  }

  set categoryID(value: number) {
    this._categoryID = value;
  }
}
