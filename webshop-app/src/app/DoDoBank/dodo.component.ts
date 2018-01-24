import { Component, OnInit } from '@angular/core';

import * as types from '../types';
import { WebshopService } from '../webshop.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dodo',
  templateUrl: './dodo.component.html',
  styleUrls: ['./dodo.component.css']
})
export class dodoComponent implements OnInit {

  cart : types.CartItems[];
  errorMessage : string = undefined;
  successMessage : string = undefined;
  totalCosts:number;
  payMethod:string;

  constructor(private webshopService: WebshopService,
    private router: Router) { }

  ngOnInit() {
    this.getdodo();
  }

  getdodo() : void{
    //the created cart items
    this.webshopService.
      getCart().then((data) => {
        console.log("data: " + JSON.stringify(data, null, 2));
        this.cart = data;
        this.totalCosts = 0;

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
            this.totalCosts += this.cart[i].amount * this.cart[i].price;
            this.cart[i].productName=name;
          }
        })


      }).catch(err => {
        console.error(err);
        this.router.navigate(['/home']);
      });
  }

 pay():void{
   
   this.router.navigate(['/home']);
 }

}
