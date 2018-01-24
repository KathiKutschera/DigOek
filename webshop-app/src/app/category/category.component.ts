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
  // id : number;
  // foo: string;
  errorMessage: string = undefined;
  noProducts: boolean = false;

  constructor(
    private webshopService:WebshopService,
    private route: ActivatedRoute
  ) {
      this.route.params.subscribe( params => {
        console.log("PARAMS: " + JSON.stringify(params, null, 2));
        this.getProductsOfCategory(+params['id']);
      });
    }

  ngOnInit() {
    // this.webshopService.getProducts().then((data) =>{
    //   this.products = data;
    //   // console.log("data: " + JSON.stringify(data));
    // }).catch(err => console.error(err));
  }

  getProductsOfCategory(p : number){
    console.log("here now.");
    console.log("getProducts: " + p);
    // getProducts

    this.webshopService.getProducts(p).then((data) => {
      console.log("data: " + JSON.stringify(data, null, 2));
      if(data.length > 0){
        // seems like everythink worked fine
        this.products = data;
        this.noProducts = false;
      } else {
        this.products = undefined;
        this.noProducts = true;
      }
    }).catch(err => {
      console.error(err);
    });

  }


  addProductToShoppingCart(p : types.Product){
    console.log("wuhu");
    console.log("ordered Amount: " + p.orderdAmount);
    console.log("available Amount: " + p.amountavailable);

    let user = this.webshopService.getUsername();

    if(!user){
      window.alert(`Sorry, but you need to be logged in to order something.`);
      return;
    }

    if(isNaN(p.orderdAmount) || (p.orderdAmount < 0 )) {
      window.alert(`Sorry, but ${p.amountavailable} isn't a valid amount to order. Please fix that and try again.`);
      return;
    }
    if(p.orderdAmount > p.amountavailable){
      console.log("Not enough pieces available.")
      window.alert(`Sorry, but we only have ${p.amountavailable} pieces of ${p.name}. Please update your wanted amount of product ${p.name} and try it again.`);
      return;
    }

    this.webshopService.postCartItem(p).then((data) => {
      if(data) {
        // seems like it worked fine
        window.alert(`Added ${p.orderdAmount} pieces of ${p.name} to your shopping cart.`);

      }
    }).catch(err => {
      console.error(err);
      window.alert(`Sorry, but something went wrong. Please try again.`);
    });

  }

}
