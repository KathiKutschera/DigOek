import { Component } from '@angular/core';
import { WebshopService } from './webshop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  showLogin: boolean = false;
  username : string = undefined;
  loginUsername : string;
  loginPassword: string;
  info: string = undefined;

  constructor(
    private webshopService: WebshopService
  ) {
    this.webshopService.configureEndpoint("http://localhost:8088");
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
  }


}
