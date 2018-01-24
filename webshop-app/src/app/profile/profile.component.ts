import { Component, OnInit } from '@angular/core';
import { WebshopService } from '../webshop.service';
import { Router } from "@angular/router";

import * as moment from 'moment';

import * as types from '../types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : types.User;
  isAdmin : boolean = false;
  orders : types.Order[] = [];


  allOrders : types.Order[] = [];
  users : types.User[] = [];
  products : types.Product[] = [];

  newProduct : types.Product = {pk_productid : null, name : "", soldper : "", price : null, amountavailable : null, vatrate : null, fk_groupid : null};

  showPrevOrders : boolean = false;
  showProfileDetails : boolean = true;
  showUserManagement : boolean  = false;
  showOrderManagement : boolean = false;

  newPassword : string = undefined;
  newPasswordRepeat : string = undefined;

  errorMessage : string = undefined;
  successMessage : string = undefined;

  errorMessageEdit : string = undefined;
  successMessageEdit : string = undefined;

  noOrders : boolean = false;
  noAllOrders : boolean = false;

  showAddProduct : boolean = false;

  errorMessageAddProd : string = undefined;
  successMessageAddProd : string = undefined;

  constructor(
    private webshopService: WebshopService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserByUsername();
    this.getOrdersByUsername();
    this.isAdmin = this.webshopService.getUserIsAdmin();
    if(this.isAdmin){
      this.getUsers();
      this.getProducts();
      this.getOrders();
    }
  }

  getUserByUsername() : void {
    this.webshopService.getUsers(this.webshopService.getUsername()).then((data) => {
      let users : types.User[] = data;
      console.log("data: " + JSON.stringify(data, null, 2));
      if(users.length == 1){
        // found the users profile
        this.user = users[0];
      } else {
        // should not happen...
        // TODO: error handling
      }
    }).catch(err => {
      console.error(err);
      this.router.navigate(['/home']);
    });
  }

  getUsers() : void {
    this.webshopService.getUsers().then((data) => {
      let users : types.User[] = data;
      console.log("data: " + JSON.stringify(data, null, 2));
      this.users = data;
    }).catch(err => {
      console.error(err);
      this.router.navigate(['/home']);
    });
  }

  getProducts() : void {
    this.webshopService.getProducts().then((data) => {
      console.log("data: " + JSON.stringify(data, null, 2));
      this.products = data;
    }).catch(err => {
      console.error(err);
      this.router.navigate(['/home']);
    });
  }

  saveChanges(): void {
    console.log("user: " + JSON.stringify(this.user, null, 2));
    if(this.newPassword){
      if(!this.newPasswordRepeat){
        // display error message
        this.errorMessage = "The password and the repeated password do not match. Please fix this and try again."
        return;
      } else {
        this.user.pwhash = this.newPassword;
      }
    } else if(this.newPasswordRepeat){
      if(!this.newPassword){
        // display error message
        this.errorMessage = "The password and the repeated password do not match. Please fix this and try again."
        return;
      }
    }
    if(!this.newPassword && !this.newPasswordRepeat){
      this.user.pwhash = "PW";
    }

    if(!(this.newPassword == this.newPasswordRepeat)){
      // display error message
      this.errorMessage = "The password and the repeated password do not match. Please fix this and try again."
      return;
    }
    if(!this.user.email){
      // display error message
      this.errorMessage = "You need to provide an email address. Please fix this and try again."
      return;
    }

    this.webshopService.putUser(this.user).then((data) => {
      console.log("data: " + JSON.stringify(data, null, 2));
      if(data){
        // seems like it worked
        this.successMessage = "Successfully updated your profile."
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

  deleteUser(u? : types.User): void {
    this.webshopService.deleteUser(u)
    .then((data) => {
      console.log("data: " + JSON.stringify(data, null, 2));
      if(data){
        // seems like it worked
        if(u){
          u.successMessageEdit = `Successfully deleted ${u? u.pk_username.concat('s') : 'your'} profile.`;
        } else{
          this.successMessage = `Successfully deleted ${u? u.pk_username.concat('s') : 'your'} profile.`;

        }
      }
    }).catch(err => {
      console.error(err);
      if (u) {
        u.errorMessageEdit = `${u.pk_username} may have open bills. Users with open bills cannot be deleted.`;
      } else {
        this.errorMessage = "You may have open bills. Users with open bills cannot be deleted.";
      }
    });
  }

  saveChangesAdmin(u : types.User) : void {
    console.log("USER TO CHANGE: " + JSON.stringify(u));

    u.pwhash = undefined;

    this.webshopService.putUser(u).then((data) => {

      // need to get and set his password.... otherwise the new password is the hashed pwhash
      console.log("data: " + JSON.stringify(data, null, 2));
      if(data){
        // seems like it worked
        this.successMessageEdit = "Successfully updated your profile."
        // this.user = undefined;
        return;
      } else {
        // should not happen...
        this.errorMessageEdit = "We are sorry, but an error occured. Please try again later.";
      }
    }).catch(err => {
      console.error(err);
      this.errorMessageEdit = "";
      this.errorMessageEdit.concat("We are sorry, but an error occurred: ", err);

    });
  }


  getOrdersByUsername(): void {
    this.webshopService.getOrdersByUsername(this.webshopService.getUsername()).then((data) => {
      console.log("ORDERS OF USER: " + JSON.stringify(data, null, 2));
      if(data){
        // seems like it worked
        this.orders = data;
        console.log("this.orders[0].orderdate : " + moment().format(this.orders[0].orderdate));
        this.noOrders = false;

        //go through all elements and find out their name
        this.webshopService.getProducts().then((data)=>{
          let prod:types.Product[] = data;
          let i = 0;
          for(;i < this.orders.length;i++){
            let h = 0;
            for(;h < this.orders[i].items.length;h++){
              //Search for the product of this item
              let a = 0;
              let name:string;
              for(;a < prod.length && name === undefined; a++){
                if(prod[a].pk_productid==this.orders[i].items[h].fk_productid){
                  name = prod[a].name;
                }
              }
              this.orders[i].items[h].productName=name;
          }
          }
        })

      } else {
        this.orders = undefined;
        this.noOrders = true;
      }
    }).catch(err => {
      console.error(err);
      this.orders = undefined;
      this.noOrders = true;
    });
  }

  getOrders(): void {
    this.webshopService.getOrders().then((data) => {
      console.log("data: " + JSON.stringify(data, null, 2));
      if(data){
        // seems like it worked
        this.allOrders = data;
        console.log("this.orders[0].orderdate : " + moment().format(this.allOrders[0].orderdate));
        this.noAllOrders = false;

        //go through all elements and find out their name
        this.webshopService.getProducts().then((data)=>{
          let prod : types.Product[] = data;
          let i = 0;
          for(; i < this.allOrders.length; i++){
            let h = 0;
            for(; h < this.allOrders[i].items.length; h++){
              //Search for the product of this item
              let a = 0;
              let name : string;
              for(;a < prod.length && name === undefined; a++){
                if(prod[a].pk_productid==this.allOrders[i].items[h].fk_productid){
                  name = prod[a].name;
                }
              }
              this.allOrders[i].items[h].productName=name;
          }
          }
        })

      } else {
        this.allOrders = undefined;
        this.noAllOrders = true;
      }
    }).catch(err => {
      console.error(err);
      this.allOrders = undefined;
      this.noAllOrders = true;
    });
  }




  formatDate(date: string) : string {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }


  updateProduct(p : types.Product) : void {
    this.webshopService.putProduct(p).then((data) => {
      if(data){
        // seems like it worked
        p.successMessage = "Successfully updated the product."
        // this.user = undefined;
        return;
      } else {
        // should not happen...
        p.errorMessage = "We are sorry, but an error occured. Please try again later.";
      }
    }).catch(err => {
      console.error(err);
      this.errorMessageEdit = "";
      this.errorMessageEdit.concat("We are sorry, but an error occurred: ", err);

    });
  }

  deleteProduct(p : types.Product) : void {
    this.webshopService.deleteProduct(p).then((data) => {
      if(data){
        // seems like it worked
        p.successMessage = "Successfully deleted the product."
        // this.user = undefined;
        return;
      } else {
        // should not happen...
        p.errorMessage = "We are sorry, but an error occured. Please try again later.";
      }
    }).catch(err => {
      console.error(err);
      this.errorMessageEdit = "";
      this.errorMessageEdit.concat("We are sorry, but an error occurred: ", err);

    });
  }


  addNewProduct() : void {
    console.log(JSON.stringify(this.newProduct, null, 2));
    if (!this.newProduct.name) {
      this.errorMessageAddProd = "The field 'Name' is a required field. Please fix this and try again."
      return;
    }
    if (!this.newProduct.soldper) {
      this.errorMessageAddProd = "The field 'Sold per' is a required field. Please fix this and try again."
      return;
    }
    if(!this.newProduct.price && (this.newProduct.price < 0)) {
      this.errorMessageAddProd = "The field 'Price' is a required field. Please fix this and try again."
      return;
    }
    if(!this.newProduct.amountavailable) {
      this.errorMessageAddProd = "The field 'Available Amount' is a required field. Please fix this and try again."
      return;
    }
    if(!this.newProduct.vatrate) {
      this.errorMessageAddProd = "The field 'VAT Rate' is a required field. Please fix this and try again."
      return;
    }

    this.webshopService.postProduct(this.newProduct).then((data) => {
      console.log("data: " + JSON.stringify(data, null, 2));
      if(data){
        // seems like it worked
        this.successMessageAddProd = "Successfully added new product."
        this.newProduct = {pk_productid : null, name : "", soldper : "", price : null, amountavailable : null, vatrate : null, fk_groupid : null};
        return;
      } else {
        // should not happen...
        this.errorMessageAddProd = "We are sorry, but an error occured. Please try again later.";
      }
    }).catch(err => {
      console.error(err);
      this.errorMessageAddProd = "";
      this.errorMessageAddProd.concat("We are sorry, but an error occurred: ", err);

    });
  }

  saveOrderChanges(p : number) : void {
    this.webshopService.putOrder(this.orders[p]).then((data) => {
      if(data){
        // seems like it worked
        this.successMessage = "Successfully updated the product."
        // this.user = undefined;
        return;
      } else {
        // should not happen...
        this.errorMessage = "We are sorry, but an error occured. Please try again later.";
      }
    }).catch(err => {
      console.error(err);
      this.errorMessageEdit = "";
      this.errorMessageEdit.concat("We are sorry, but an error occurred: ", err);

    });
  }

  deleteOrder(p : types.Product) : void {
    /*this.webshopService.deleteProduct(p).then((data) => {
      if(data){
        // seems like it worked
        p.successMessage = "Successfully deleted the product."
        // this.user = undefined;
        return;
      } else {
        // should not happen...
        p.errorMessage = "We are sorry, but an error occured. Please try again later.";
      }
    }).catch(err => {
      console.error(err);
      this.errorMessageEdit = "";
      this.errorMessageEdit.concat("We are sorry, but an error occurred: ", err);

    });*/
  }

}
