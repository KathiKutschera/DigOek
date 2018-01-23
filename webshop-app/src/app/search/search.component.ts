import { Component, OnInit } from '@angular/core';
import { WebshopService } from '../webshop.service';

import * as types from '../types';

import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products : types.Product[] = [];

  noResultsFound : boolean = false; 

  constructor(
    private webshopService:WebshopService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe( params => {
      console.log("PARAMS: " + JSON.stringify(params, null, 2));
      this.startSearch(params['term']);
    });
     }

  ngOnInit() {
  }

  startSearch(term: string) : void {
    console.log("TERM : " + term);
    this.webshopService.getProducts(null, term).then((data) => {
      console.log("SEARCH data: " + JSON.stringify(data, null, 2));
      if(data.length > 0){
        // seems like everythink worked fine
        this.products = data;
        this.noResultsFound = false;
      } else {
        this.products = undefined;
        this.noResultsFound = true;
      }
    }).catch(err => {
      console.error(err);
    });

  };

}
