import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare var paypal: { Buttons: (arg0: { createOrder: (data: any, actions: any) => any; onApprove: (data: any, actions: any) => Promise<void>; onError: (err: any) => void; }) => { (): any; new(): any; render: { (arg0: any): void; new(): any; }; }; };

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  // @ts-ignore
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

  product =   {
    "id": 3,
    "title": "ECOM Ecommerce web platform",
    "description": "This is a web template for a fully functioning Ecommerce platform, where products can be shown, browsed, wishlisted, put in cart, bought, added reviews, user created, etc.The server is realized via PHP and MySQL database. The frontend is JavaScript, HTML and CSS.",
    "img": [
      "./assets/image/product/instargra-1.png",
    ],
    "price": "310.09",
    "author": "letrungnhan",
    "rating": 3,
    "languageName": [
      "JAVASCRIPT",
      "HTML",
      "CSS"
    ],
    "industryName": [
      "WEB"
    ],
    "tagName": [
      "WEBSYSTEM"
    ],
    "quantity": 1
  }

  paidFor = false;

  ngOnInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
}
