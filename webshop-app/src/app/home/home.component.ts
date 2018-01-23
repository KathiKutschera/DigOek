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

     for(var i = 0; i < this.products.length; i++) {
      let amount2 = parseInt((<HTMLInputElement>document.getElementById(`${this.products[i].pk_productid}`)).value);
       if (this.products[i].hasOwnProperty("amount")){
         if (this.products[i].amountavailable < amount2){
           window.alert(`There is a negative amount of ${this.products[i].name}. Therefore, your order will not be processed.`);
           return;
         }
         if (this.products[i].amountavailable >= amount2) {
           let targ :types.CartItems = {"pk_cartid":0,"amount":amount2, "price":this.products[i].price, "fk_pk_username":this.webshopService.getUsername(), "fk_pk_productid":
              this.products[i].pk_productid};
            this.webshopService.postCartItem(targ)
            .catch(err => {
              console.error(err);
            });
           
         }
       }
     }

    // TODO: add item to shopping cart


  }

}
