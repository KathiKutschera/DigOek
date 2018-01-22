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
          resolve (`${users[0].name} ${users[0].surname}`);
        } else {
          reject ("fail");
        }
      }).catch(err => {
        console.error(err);
        reject("fail");
      });
    });


  }

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


  getProducts() : Promise<types.Product[]> {
    let params = new HttpParams();
    params = params.append('limit', "100");
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

  putUser(user: types.User) : Promise<types.Username> {
    if("PW" == user.pwhash){
      user.pwhash = this.password;
    }
    let params = new HttpParams();
    params = params.append('body', JSON.stringify(user));
    return this.http.put(`${this.url}/rest/users/${this.username}`, {
      params: params,
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
