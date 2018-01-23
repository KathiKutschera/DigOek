import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

import * as types from './types';

@Injectable()
export class WebshopService {

  constructor(private http: HttpClient) { }

  private url : string;
  private username : string;
  private password : string;
  private isAdmin : boolean;

  public configureEndpoint(url: string) : void {
    this.url = url;
  }

  public configureUser(username: string, password: string) : Promise<string> {
    return new Promise ((resolve, reject) => {
      this.username = username;
      this.password = password;

      let users : types.User[] = [];

      this.getUsers(username).then((data) =>{
        users = data;
        console.log("data: " + JSON.stringify(data, null, 2));
        if(users.length == 1){
          // user login successful
          this.isAdmin = users[0].isadmin;
          return resolve (`${users[0].name} ${users[0].surname}`);
        } else {
          return reject ("fail");
        }
      }).catch(err => {
        console.error(err);
        return reject("fail");
      });
    });
  }


  public getUsername(): string {
      return this.username;
  }

  public getUserIsAdmin(): boolean {
      return this.isAdmin;
  }



  // get Users (by Username?)
  getUsers(username? : string) : Promise<types.User[]> {
    let params = new HttpParams();
    params = params.append('limit', "100");
    if(username){
      params = params.append('username', username);
    }

    return this.http.get(`${this.url}/rest/users`, {
      params: params,
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
    })
    .toPromise()
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch(this.handleError);
  }

  // put User by Username
  putUser(user: types.User) : Promise<types.Username> {
    if("PW" == user.pwhash){
      user.pwhash = this.password;
    }
    console.log("put User: " + JSON.stringify(user, null, 2));
    console.log("username: " + this.username);
    console.log("password: " + this.password);
    // let body = user;
    // // let params = new HttpParams();
    // // params = params.append('body', JSON.stringify(user));
    return this.http.put(`${this.url}/rest/users/${user.pk_username}`, user,{
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
    })
    .toPromise()
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch(this.handleError);
  }

  // delete User
  deleteUser(user?: types.User) : Promise<types.Username> {
    if(!user){
      user = { pk_username : this.username };
    }
    return this.http.delete(`${this.url}/rest/users/${user.pk_username}`, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
    })
    .toPromise()
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch(this.handleError);
  }

  // register user
  postRegistration(user: types.User) : Promise<types.Username> {
    // console.log("put User: " + JSON.stringify(user, null, 2));
    return this.http.post(`${this.url}/rest/register`, user,{
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
    })
    .toPromise()
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch(this.handleError);
  }



  // get Products
  getProducts(groupid? : number, keyword? : string) : Promise<types.Product[]> {
    let params = new HttpParams();
    params = params.append('limit', "100");
    if(groupid){
      params = params.append('groupid', groupid.toString());
    }
    if(keyword){
      params = params.append('keyword', keyword);
    }
    return this.http.get(`${this.url}/rest/products`, {
      params: params,
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
    })
    .toPromise()
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch(this.handleError);
  }


  // get Orders
  getOrders() : Promise<types.Order[]> {
    let params = new HttpParams();
    params = params.append('limit', "100");
    return this.http.get(`${this.url}/rest/orders`, {
      params: params,
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
    })
    .toPromise()
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch(this.handleError);
  }


  // get Productgroups
  getProductGroups() : Promise<types.Productgroup[]> {
    return this.http.get(`${this.url}/rest/groups`, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
    })
    .toPromise()
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch(this.handleError);
  }


  getCart() : Promise<types.CartItems[]>{
    return this.http.get(`${this.url}/rest/cart`, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
    })
    .toPromise()
    .then((response) => {
      return response;
    })
    .catch(this.handleError);
  }


  // put User by Username
  putProduct(p: types.Product) : Promise<types.Productid> {
    return this.http.put(`${this.url}/rest/products/${p.pk_productid}`, p,{
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
    })
    .toPromise()
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch(this.handleError);
  }

  deleteProduct(p : types.Product) : Promise<types.Product> {
    return this.http.delete(`${this.url}/rest/products/${p.pk_productid}`, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
    })
    .toPromise()
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
