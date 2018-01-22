import { Component, OnInit } from '@angular/core';
import { WebshopService } from '../webshop.service';

import * as types from '../types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  products : types.Product[] = [];
  id : number;

  constructor(
    private webshopService:WebshopService
  ) { }

  ngOnInit() {
    this.webshopService.getProducts().then((data) =>{
      this.products = data;
      // console.log("data: " + JSON.stringify(data));
    }).catch(err => console.error(err));
  }

}
