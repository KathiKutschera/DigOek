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
