import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../service/common.service";

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
  slides: any;
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

  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.commonService.getHomeFeatured().subscribe((slide) => {
      this.slides = slide;
    })
  }

}
