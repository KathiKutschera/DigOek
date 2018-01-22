import { Component, OnInit } from '@angular/core';
import { WebshopService } from '../webshop.service';

import * as types from '../types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : types.User;
  showPrevOrders : boolean = false;
  showProfileDetails : boolean = true;

  newPassword : string = undefined;
  newPasswordRepeat : string = undefined;

  errorMessage : string;
  successMessage : string;

  // user : types.User = {"pk_username": "testuser", "email": "test@user.at", "name": "Test", "surname": "User", "billingaddress": "my fancy address", "deliveryaddress": "my super facy address"};
  constructor(private webshopService: WebshopService) { }

  ngOnInit() {
    this.webshopService.getUsers().then((data) => {
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
      } else {
        // should not happen...
        // TODO: error handling
      }
    }).catch(err => {
      console.error(err);
      this.errorMessage.concat("We are sorry, but an error occurred: ", err);
      // this.error
    });
  }

  deleteUser(): void {
    // if(!(this.pPW1 == this.pPW2)){
    //   // display error message
    //   return;
    // }
    // if(!this.pEmail){
    //   // display error message
    //   return;
    // }
    //
    // this.webshopService.putUser().then((data) => {
    //   let users : types.User[] = data;
    //   console.log("data: " + JSON.stringify(data, null, 2));
    //   if(users.length == 1){
    //     // found the users profile
    //     this.user = users[0];
    //   } else {
    //     // should not happen...
    //     // TODO: error handling
    //   }
    // }).catch(err => {
    //   console.error(err);
    // });
  }


}
