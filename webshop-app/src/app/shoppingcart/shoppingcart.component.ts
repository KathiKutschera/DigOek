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
  errorMessage : string = undefined;
  successMessage : string = undefined;

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

  saveChanges(p:number): void {
    
    this.webshopService.putCartItem(this.cart[p]).then((data) => {
      console.log("data: " + JSON.stringify(data, null, 2));
      if(data){
        // seems like it worked
        this.successMessage = "Successfully updated your shoppingCart."
        // this.user = undefined;
        return;
      } else {
        // should not happen...
        this.errorMessage = "We are sorry, but an error occured. Please try again later.";
      }
    }).catch(err => {
      console.error(err);
      this.errorMessage = "";
      this.errorMessage.concat("We are sorry, but an error occurred: ", err);

    });
  }

  deleteItem(p : number): void {
    this.webshopService.deleteCartItem(this.cart[p])
    .then((data) => {
      console.log("data: " + JSON.stringify(data, null, 2));
      if(data){
        // seems like it worked
        this.successMessage = `Successfully removed this item.`;
      }
    }).catch(err => {
      console.error(err);
      this.errorMessage = "Element not removed. This may be because of a server error.";
    });
  }

}
