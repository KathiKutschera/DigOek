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
  users : types.User[] = [];
  products : types.Product[] = [];

  showPrevOrders : boolean = false;
  showProfileDetails : boolean = true;
  showUserManagement : boolean  = false;

  newPassword : string = undefined;
  newPasswordRepeat : string = undefined;

  errorMessage : string = undefined;
  successMessage : string = undefined;

  errorMessageEdit : string = undefined;
  successMessageEdit : string = undefined;

  noOrders : boolean = false;

  // user : types.User = {"pk_username": "testuser", "email": "test@user.at", "name": "Test", "surname": "User", "billingaddress": "my fancy address", "deliveryaddress": "my super facy address"};
  constructor(
    private webshopService: WebshopService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserByUsername();
    this.getOrders();
    this.isAdmin = this.webshopService.getUserIsAdmin();
    if(this.isAdmin){
      this.getUsers();
      this.getProducts();
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


  getOrders(): void {
    this.webshopService.getOrders().then((data) => {
      console.log("data: " + JSON.stringify(data, null, 2));
      if(data){
        // seems like it worked
        this.orders = data;
        console.log("this.orders[0].orderdate : " + moment().format(this.orders[0].orderdate));
        this.noOrders = false;
      } else {
        this.orders = undefined;
        this.noOrders = true;
      }
    }).catch(err => {
      console.error(err);
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



}
