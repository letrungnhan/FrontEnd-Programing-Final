export class Products {
  id: string;
  title: string;
  category: string;
  description: string;
  author: string;
  price: string;


  constructor(id: string, title: string, category: string, description: string, author: string, price: string) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.description = description;
    this.author = author;
    this.price = price;
  }
}
