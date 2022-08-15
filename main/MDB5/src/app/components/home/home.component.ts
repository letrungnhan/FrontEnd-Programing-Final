import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  banners = [
    {label: 'Software Services', src: './assets/image/banner/banner-2.png'},
    {label: 'Home Service App', src: './assets/image/banner/banner-3.png'},
    {label: 'E-Learning App', src: './assets/image/banner/banner-4.png'},
    {label: 'Coding', src: './assets/image/banner/banner-5.png'},
    {label: 'Coding More', src: './assets/image/banner/banner-6.png'},
    {label: 'Coding', src: './assets/image/banner/banner-7.png'},
    {label: 'E-commerce Website', src: './assets/image/banner/banner-8.png'},
    {label: 'Design', src: './assets/image/banner/banner-9.png'}
  ];
  featuredItems=[

  ]

  slides = [
    { img: 'https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp' },
    { img: 'https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp' },
    { img: 'https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp' },
    { img: 'https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp' },
    { img: 'https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp' },
  ];
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };
  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
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
