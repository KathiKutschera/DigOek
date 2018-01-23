import { Component, OnInit } from '@angular/core';
import { WebshopService } from './webshop.service';

import { RouterModule, Router } from "@angular/router";

import * as types from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  showLogin: boolean = false;

  username : string = undefined;
  isAdmin : boolean = false;

  loginUsername : string;
  loginPassword: string;

  info: string = undefined;

  newUser : types.User = {pk_username: "", email: ""};
  newUserPW1 : string = undefined;
  newUserPW2 : string = undefined;

  errorMessageAdd : string = undefined;
  successMessageAdd : string = undefined;

  searchTerm : string = undefined;

  productgroups: types.Productgroup[] = [];

  constructor(
    private webshopService: WebshopService,
    private router: Router
  ) {
    this.webshopService.configureEndpoint("http://localhost:8088");
  }

  // on init : get products....
  ngOnInit() {
    this.getProductGroups();
    this.isAdmin = this.webshopService.getUserIsAdmin();
  }

  isUserAdmin() : boolean {
    return this.webshopService.getUserIsAdmin();
  }


  login() {
    let result : string;
    this.webshopService.configureUser(this.loginUsername, this.loginPassword).then((data) =>{
      console.log("data: " + JSON.stringify(data));
      if(data == "fail"){
        // error handling...
        this.info = "Username and passwort are not correct. Please try again."
        this.username = data;
      } else {
        this.username = data;
        this.router.navigate(['/home']);
      }
    }).catch(err => {
      console.error(err);
      this.info = "Username and passwort are not correct. Please try again."
    });

    this.loginUsername = undefined;
    this.loginPassword = undefined;
  }

  logout() {
    this.username = undefined;
    this.webshopService.configureUser(this.username, undefined);
    this.router.navigate(['/home']);
  }

  register() : void{
    console.log("register: user: " + JSON.stringify(this.newUser, null, 2));
    if(!this.newUser.pk_username){
      this.errorMessageAdd = "You need to provide an username. Please fix that and try again.";
      console.log("No Username");
      return;
    }
    if(!this.newUser.email){
      this.errorMessageAdd = "You need to provide an email address. Please fix that and try again";
      console.log("No Email");
      return;
    }
    if(!this.newUserPW1 || !this.newUserPW2){
      this.errorMessageAdd = "You need to provide your passwort and to repeated your passwort. Please fix that and try again."
      console.log("No or not both passwords");
      return;
    }
    if(this.newUserPW1 != this.newUserPW2){
      this.errorMessageAdd = "The password and the repeated password you provided do not match. Please fix that and try again."
      console.log("No mathing passwords");
      return;
    }
    if(this.newUser.validyear){
      if(isNaN(this.newUser.validyear) || (this.newUser.validyear < 2018) || (this.newUser.validyear > 2025)) {
        this.errorMessageAdd = "The year till that your credit card is valid to needs to be a number. Please fix that and try again."
        console.log("Valid year is violates the rules");
        return;
      }
    }
    if(this.newUser.validmonth) {
      if(isNaN(this.newUser.validmonth) || (this.newUser.validmonth < 1) || (this.newUser.validmonth > 12)){
        this.errorMessageAdd = "The month till that your credit card is valid to needs to be a number between 1 and 12. Please fix that and try again."
        console.log("Validmonth is violates the rules");
        return;
      }
    }
    if(this.newUser.ccv) {
      if(isNaN(this.newUser.ccv) || (this.newUser.ccv < 0)){
        this.errorMessageAdd = "The ccv of your credit card needs to be a number. Please fix that and try again."
        console.log("CCV violates the rules");
        return;
      }
    }

    this.newUser.pwhash = this.newUserPW1;

    this.webshopService.postRegistration(this.newUser).then((data) => {
      console.log("data: " + JSON.stringify(data, null, 2));
      if(data){
        // seems like it worked
        this.successMessageAdd = "";
        this.successMessageAdd = this.successMessageAdd.concat("Successfully registered user '", this.newUser.pk_username, "'. Please log in now.")
        // clean up..
        this.newUser = {pk_username: "", email: ""};
        this.newUserPW1 = undefined;
        this.newUserPW2 = undefined;
        // this.errorMessageAdd = "";
        // this.successMessageAdd = "";
      }
    }).catch(err => {
      console.error(err);
      this.errorMessageAdd = "Username may be taken. Please try another one";
    });
  }

  getProductGroups(): void {
    this.webshopService.getProductGroups().then((data) => {
      this.productgroups = data;
      console.log("data: " + JSON.stringify(data, null, 2));
      // do something else?
    }).catch(err => {
      console.error(err);
    });
  }

  // goToCategory(id: number) : void{
  //   this.router.navigate(['category', id]);
  // }


}
