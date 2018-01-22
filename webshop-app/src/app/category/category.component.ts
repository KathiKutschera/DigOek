import { Component, OnInit } from '@angular/core';
import { WebshopService } from '../webshop.service';

import * as types from '../types';

import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  products : types.Product[] = [];
  id : number;
  foo: string;

  constructor(
    private webshopService:WebshopService,
    private route: ActivatedRoute
  ) {
      this.route.params.subscribe( params => {
        console.log("PARAMS: " + JSON.stringify(params, null, 2));
        this.getProductsOfCategory(params['id']);
      });
    }

  ngOnInit() {
    // this.webshopService.getProducts().then((data) =>{
    //   this.products = data;
    //   // console.log("data: " + JSON.stringify(data));
    // }).catch(err => console.error(err));
  }

  getProductsOfCategory(p : string){
    console.log("here now.");
    console.log("getProducts: " + p);
  }

}
