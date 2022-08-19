export class Products {
  private _id: number;
  private _title: string;
  private _description: string;
  private _img: string[];
  private _price: number;
  private _author: string;
  private _rating: number;
  private _languageName: string[];
  private _industryName: string[];
  private _tagName: string[];
  private _quantity: number;


  constructor(id: number, title: string, description: string, img: string[], price: number, author: string, rating: number, languageName: string[], industryName: string[], tagName: string[], quantity: number) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._img = img;
    this._price = price;
    this._author = author;
    this._rating = rating;
    this._languageName = languageName;
    this._industryName = industryName;
    this._tagName = tagName;
    this._quantity = quantity;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get img(): string[] {
    return this._img;
  }

  set img(value: string[]) {
    this._img = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value;
  }

  get languageName(): string[] {
    return this._languageName;
  }

  set languageName(value: string[]) {
    this._languageName = value;
  }

  get industryName(): string[] {
    return this._industryName;
  }

  set industryName(value: string[]) {
    this._industryName = value;
  }

  get tagName(): string[] {
    return this._tagName;
  }

  set tagName(value: string[]) {
    this._tagName = value;
  }
}
