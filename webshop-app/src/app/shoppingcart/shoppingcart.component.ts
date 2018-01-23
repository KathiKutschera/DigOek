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

  cart : types.CartItems[];

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
        
        //go through all elements and find out their name
        this.webshopService.getProducts().then((data)=>{
          let prod:types.Product[] = data;
          let i = 0;
          for(;i < this.cart.length;i++){
            //Search for the product of this item
            let a = 0;
            let name:string;
            for(;a < prod.length && name === undefined; a++){
              if(prod[a].pk_productid==this.cart[i].fk_pk_productid){
                name = prod[a].name;
              }
            }
            this.cart[i].productName=name;
          }
        })
        

      }).catch(err => {
        console.error(err);
        this.router.navigate(['/home']);
      });


  }

}
