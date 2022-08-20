import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  icons=[
    {src:'https://www.piecex.com/assets/img/common/home/php.webp'},
    {src:'https://www.piecex.com/assets/img/common/home/java.webp'},
    {src:'https://www.piecex.com/assets/img/common/home/html3.webp'},
    {src:'https://www.piecex.com/assets/img/common/home/html1.webp'},
    {src:'https://www.piecex.com/assets/img/common/home/node.webp'},
    {src:'https://www.piecex.com/assets/img/common/home/c.webp'},
    {src:'https://www.piecex.com/assets/img/common/home/python.webp'},
  ]
  banners = [
    {label: 'Software Services', src: './assets/image/banner/banner-2.png'},
    {label: 'Home Service App', src: './assets/image/banner/banner-3.png'},
    {label: 'E-Learning App', src: './assets/image/banner/banner-4.png'},
    {label: 'Website Coding', src: './assets/image/banner/banner-5.png'},
    {label: 'Coding More', src: './assets/image/banner/banner-6.png'},
    {label: 'AI', src: './assets/image/banner/banner-7.png'},
    {label: 'E-commerce Website', src: './assets/image/banner/banner-8.png'},
    {label: 'Mobile Apps', src: './assets/image/banner/banner-9.png'}
  ];
  slides = [
    {
      img: './assets/image/slider/slider-product-1.png',
      title: 'PDF Scanner',
      description: 'We Scan is a super light and smart scanner app in your pocket. This app can quickly scan your paper documents on the go and export them as PDF files or Images. '
    },
    {
      img: './assets/image/slider/slider-product-2.png',
      title: 'HR Manager Smart Business Tracker React App',
      description: '1. Full react native expo source code for app\n' +
        '\n' +
        '2. Backend Api project publishable files(Asp.net)\n' +
        '\n' +
        '3. Database script\n' +
        '\n' +
        '4. Full documentation'
    },
    {
      img: './assets/image/slider/slider-product-3.png',
      title: 'Febit Digital Currency Exchange Platform',
      description: 'Cryptocurrency exchange script is a pre-fabricated bitcoin exchange software that helps you to create and launch a user-friendly crypto trading platform instantly.Our script comes with the latest trading modules and robust security features. '
    },
    {
      img: './assets/image/slider/slider-product-4.png',
      title: 'Multiple Modern Website',
      description: 'The source code of this template is very simple and can be easily modified according to the need. It contains beautiful loading content section and hover effects.'
    },
    {
      img: './assets/image/slider/slider-product-5.png',
      title: '2020 Ecommerce Grocery App UI Kit with Flutter 30 Screens for Android and IOS',
      description: '2020 Ecommerce Grocery App UI Kit with Flutter 30 Screens for Android and IOS A highly customizable, fully-developed and production-ready Ecommerce/grocery app Frontend UI code with over 30 screens made with Flutter.Compatible with both Android and IOS.'
    },

  ];
  slideConfig = {slidesToShow: 4, slidesToScroll: 4};

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
