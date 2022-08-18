export class Products {
  private _id: number;
  private _title: string;
  private _description: string;
  private _img: string;
  private _price: number;
  private _author: string;
  private _rating: number;
  private _categoryID: string;


  constructor(id: number, title: string, description: string, img: string, price: number, author: string, rating: number, category: string) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._img = img;
    this._price = price;
    this._author = author;
    this._rating = rating;
    this._categoryID = category;
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

  get img(): string {
    return this._img;
  }

  set img(value: string) {
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


  get categoryID(): string {
    return this._categoryID;
  }

  set categoryID(value: string) {
    this._categoryID = value;
  }
}
