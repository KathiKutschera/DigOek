import { Component, OnInit } from '@angular/core';

import * as types from '../types';
import { WebshopService } from '../webshop.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  cart : types.Cart;

  constructor(private webshopService: WebshopService, 
    private router: Router) { }

  ngOnInit() {
    this.getShoppingCart();
  }

  getShoppingCart() : void{
    //the created cart items
    this.webshopService.
      getCart().then((data) => {
        console.log("data: " + JSON.stringify(data, null, 2));
        this.cart = data;
        
      }).catch(err => {
        console.error(err);
        this.router.navigate(['/home']);
      });


  }

}
