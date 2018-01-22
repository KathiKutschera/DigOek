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
    console.log("user: " + JSON.stringify(this.user));
    if(this.newPassword){
      if(!this.newPasswordRepeat){
        // display error message
        return;
      } else {
        this.user.pwhash = this.newPassword;
      }
    } else if(this.newPasswordRepeat){
      if(!this.newPassword){
        // display error message
        return;
      }
    }
    if(!this.newPassword && !this.newPasswordRepeat){
      this.user.pwhash = "PW";
    }
    // TODO: also need to check case when newPasswordRepeat but not newPassword

    if(!(this.newPassword == this.newPasswordRepeat)){
      // display error message
      return;
    }
    if(!this.user.email){
      // display error message
      return;
    }

    this.webshopService.putUser(this.user).then((data) => {
      console.log("data: " + JSON.stringify(data, null, 2));
      if(data){
        // found the users profile
        // do something
      } else {
        // should not happen...
        // TODO: error handling
      }
    }).catch(err => {
      console.error(err);
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
