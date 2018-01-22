import { Component, OnInit } from '@angular/core';
import { WebshopService } from '../webshop.service';

import * as types from '../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products : types.Product[] = [];

  constructor(
    private webshopService: WebshopService
  ) {
    // webshopService.configureEndpoint("http://localhost:8088", "admin", "admin");
  }

  ngOnInit() {
    this.webshopService.getProducts().then((data) =>{
      this.products = data;
      console.log("data: " + JSON.stringify(data));
      // this.sortProducts();
    }).catch(err => console.error(err));

  }


  addProductToShoppingCart(){
    // TODO: something like these checks

    // for(var i = 0; i < this.products.length; i++) {
    //   if (this.products[i].hasOwnProperty("amount")){
    //     if (this.products[i].amount < 0){
    //       this.info = `There is a negative amount of ${this.products[i].name}. Therefore, your order will not be processed.`;
    //       return;
    //     }
    //     if (Number.isInteger(this.products[i].amount) && this.products[i].amount > 0) {
    //       foundAtLeastOne = true;
    //       order.push({productID : this.products[i].id, amount : this.products[i].amount});
    //     }
    //   }
    // }
    // if (!foundAtLeastOne){
    //   this.info = `There is no single amount correctly given. Therefore, your order will not be processed.`;
    //   return;
    // }

    // TODO: add item to shopping cart
  }

}
