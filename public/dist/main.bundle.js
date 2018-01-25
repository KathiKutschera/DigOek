webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <br/>\n\n  <div class=\"container-fluid\" style=\"text-align:right\">\n    <div class=\"btn-group\" role=\"group\" aria-label=\"Basic example\">\n\n      <button type=\"button\" routerLink=\"/profile\" class=\"btn btn-secondary btn-lg\" *ngIf=\"username\">\n          <span *ngIf=\"isUserAdmin()\"><i class=\"fa fa-user-secret\" aria-hidden=\"true\"></i></span>\n          <span *ngIf=\"!isUserAdmin()\"><i class=\"fa fa-user\" aria-hidden=\"true\"></i></span>\n        {{username}}\n      </button>\n\n        <!-- dropdown button - don't working, don't know why -->\n        <!-- <button type=\"button\" class=\"btn btn-secondary btn-lg dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" id=\"dropdownMenu\" *ngIf=\"username\">\n            <span><i class=\"fa fa-user\" aria-hidden=\"true\"></i></span>\n          {{username}}\n        </button>\n          <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu\">\n            <a class=\"dropdown-item\" routerLink=\"/profile\"> ProfileAction</a>\n            <a class=\"dropdown-item\" routerLink=\"/profile\">Previous Orders</a>\n          </div> -->\n\n\n      <button type=\"button\" routerLink=\"/shoppingcart\" class=\"btn btn-secondary btn-lg\" *ngIf=\"username\">\n        <span><i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i></span>\n      </button>\n      <button type=\"button\" class=\"btn btn-secondary btn-lg\" *ngIf=\"!username\" (click)=\"showRegister = false; showLogin = true\">\n        Login\n        <span><i class=\"fa fa-sign-in\" aria-hidden=\"true\"></i></span>\n      </button>\n      <button type=\"button\" class=\"btn btn-secondary btn-lg\" *ngIf=\"!username\" (click)=\"showLogin = false; showRegister = true\">\n        Register\n        <span><i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i></span>\n      </button>\n      <button type=\"button\" class=\"btn btn-secondary btn-lg\" *ngIf=\"username\" (click)=\"logout()\">\n        Logout\n        <span><i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i></span>\n      </button>\n      <!-- <button type=\"button\" class=\"btn btn-secondary btn-lg\">{{username}}</button> -->\n    </div>\n  </div>\n\n  <!-- login -->\n  <div class=\"container-fluid\" style=\"text-align:left\" *ngIf=\"showLogin\">\n    <br/>\n    <div>\n      <label><b>Username: </b></label>\n      <input type=\"text\" placeholder=\"Your username\" class=\"form-control input-sm\" [(ngModel)]=\"loginUsername\"/>\n    </div>\n    <br>\n    <div>\n      <label><b>Password: </b></label>\n      <input type=\"password\" placeholder=\"Your password\" class=\"form-control input-sm\" [(ngModel)]=\"loginPassword\"/>\n    </div>\n    <br/>\n    <button class=\"btn btn-lg btn-block btn-success\" (click)=\"showLogin = false; login()\">\n      Login <span><i class=\"fa fa-sign-in\" aria-hidden=\"true\"></i></span>\n    </button>\n    <button type=\"button\" class=\"btn btn-lg btn-block btn-danger\" (click)=\"showLogin = false\">Cancel\n      <span><i class=\"fa fa-ban\" aria-hidden=\"true\"></i></span>\n    </button>\n    <br/>\n  </div>\n  <br *ngIf=\"info\"/>\n  <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"info\">{{info}}\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"info = ''\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n\n\n  <!-- register -->\n  <div class=\"container-fluid\" style=\"text-align:left\" *ngIf=\"showRegister\">\n    <br/>\n    <form>\n      <div class=\"form-group\">\n        <label><b>Username</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"aName\" required [(ngModel)]=\"newUser.pk_username\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Name</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"aName\" [(ngModel)]=\"newUser.name\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Surname</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"aSurname\" [(ngModel)]=\"newUser.surname\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Email address</b></label>\n        <input type=\"email\" class=\"form-control\" name=\"aEmail\" required [(ngModel)]=\"newUser.email\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>New Password</b></label>\n        <input type=\"password\" class=\"form-control\" name=\"aPW1\" required [(ngModel)]=\"newUserPW1\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Repeat Password</b></label>\n        <input type=\"password\" class=\"form-control\" name=\"aPW2\" required [(ngModel)]=\"newUserPW2\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Company-Name</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"aCompanyName\" [(ngModel)]=\"newUser.companyname\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Billing Address</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"aBillingAddress\" [(ngModel)]=\"newUser.billingaddress\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Delivery Address</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"aDeliveryAddress\" [(ngModel)]=\"newUser.deliveryaddress\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>VAT</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"aVat\" [(ngModel)]=\"newUser.vat\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Name on Credit Card</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"aNameOnCC\" [(ngModel)]=\"newUser.nameoncc\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Creditcard Number</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"aCCNr\" [(ngModel)]=\"newUser.creditcardnr\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Creditcard Validyear</b></label>\n        <input type=\"number\" class=\"form-control\" name=\"aValidYear\" min=\"1\" max=\"4000\" ngMin=\"1\" ngMax=\"4000\" [(ngModel)]=\"newUser.validyear\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Creditcard Validmonth</b></label>\n        <input type=\"number\" class=\"form-control\" name=\"aValidMonth\" min=\"1\" max=\"12\" ngMin=\"1\" ngMax=\"12\" [(ngModel)]=\"newUser.validmonth\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Creditcard CCV</b></label>\n        <input type=\"number\" class=\"form-control\" name=\"aNameOnCC\" [(ngModel)]=\"newUser.ccv\">\n      </div>\n      <br *ngIf=\"errorMessageAdd\"/>\n      <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"errorMessageAdd\">{{errorMessageAdd}}\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"errorMessageAdd = ''\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <br *ngIf=\"successMessageAdd\"/>\n      <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" *ngIf=\"successMessageAdd\">{{successMessageAdd}}\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"successMessageAdd = ''\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <button type=\"button\" class=\"btn btn-lg btn-block btn-success\" (click)=\"register()\">Register\n        <span><i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i></span>\n      </button>\n      <button type=\"button\" class=\"btn btn-lg btn-block btn-danger\" (click)=\"showRegister = false\">Cancel\n        <span><i class=\"fa fa-ban\" aria-hidden=\"true\"></i></span>\n      </button>\n    </form>\n    <br/>\n  </div>\n\n  <div class=\"container-fluid\" style=\"text-align:left\">\n    <h1>\n      WE <span><i class=\"fa fa-heart\" aria-hidden=\"true\"></i>\n      </span> FOOD <span><i class=\"fa fa-cutlery\" aria-hidden=\"true\"></i>\n      </span>\n    </h1>\n  </div>\n\n  <br/>\n\n  <nav class=\"navbar navbar-toggleable-md navbar-light bg-faded\">\n    <!-- <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n      <span class=\"navbar-toggler-icon\"></span>\n    </button> -->\n    <a class=\"navbar-brand\" routerLink=\"/home\">We <span><i class=\"fa fa-heart\" aria-hidden=\"true\"></i>\n    </span>Food</a>\n\n    <div class=\"navbar-collapse\" id=\"navbarSupportedContent\">\n      <ul class=\"navbar-nav mr-auto\">\n\n        <div *ngFor=\"let group of productgroups; index as i\">\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" [routerLink]=\"['/category', group.pk_groupid]\">{{group.name}}\n              <span><i class={{group.iconclass}} aria-hidden=\"true\"></i></span>\n            </a>\n          </li>\n        </div>\n      </ul>\n      <form class=\"form-inline my-2 my-lg-0\">\n        <input class=\"form-control mr-sm-2\" type=\"text\" name=\"search\" [(ngModel)]=\"searchTerm\">\n        <button class=\"btn btn-outline-success my-2 my-sm-0\" [routerLink]=\"['/search', searchTerm]\" type=\"button\">Search</button>\n      </form>\n    </div>\n  </nav>\n  <br/>\n  <router-outlet></router-outlet>\n\n<!--\n  <div id=\"carouselExampleSlidesOnly\" class=\"carousel slide\" data-ride=\"carousel\">\n    <div class=\"carousel-inner\" role=\"listbox\">\n      <div class=\"carousel-item active\">\n        <img class=\"d-block img-fluid\" src=\"./assets/img2.jpg\" alt=\"First slide\">\n      </div>\n      <div class=\"carousel-item\">\n        <img class=\"d-block img-fluid\" src=\"./assets/img1.jpg\" alt=\"Second slide\">\n      </div>\n      <div class=\"carousel-item\">\n        <img class=\"d-block img-fluid\" src=\"...\" alt=\"Third slide\">\n      </div>\n    </div>\n  </div> -->\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webshop_service__ = __webpack_require__("../../../../../src/app/webshop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(webshopService, router) {
        this.webshopService = webshopService;
        this.router = router;
        this.title = 'app';
        this.showLogin = false;
        this.username = undefined;
        this.isAdmin = false;
        this.info = undefined;
        this.newUser = { pk_username: "", email: "" };
        this.newUserPW1 = undefined;
        this.newUserPW2 = undefined;
        this.errorMessageAdd = undefined;
        this.successMessageAdd = undefined;
        this.searchTerm = undefined;
        this.productgroups = [];
        this.webshopService.configureEndpoint("http://localhost:8088");
    }
    // on init : get products....
    AppComponent.prototype.ngOnInit = function () {
        this.getProductGroups();
        this.isAdmin = this.webshopService.getUserIsAdmin();
    };
    AppComponent.prototype.isUserAdmin = function () {
        return this.webshopService.getUserIsAdmin();
    };
    AppComponent.prototype.login = function () {
        var _this = this;
        var result;
        this.webshopService.configureUser(this.loginUsername, this.loginPassword).then(function (data) {
            console.log("data: " + JSON.stringify(data));
            if (data == "fail") {
                // error handling...
                _this.info = "Username and passwort are not correct. Please try again.";
                _this.username = data;
            }
            else {
                _this.username = data;
                _this.router.navigate(['/home']);
            }
        }).catch(function (err) {
            console.error(err);
            _this.info = "Username and passwort are not correct. Please try again.";
        });
        this.loginUsername = undefined;
        this.loginPassword = undefined;
    };
    AppComponent.prototype.logout = function () {
        this.username = undefined;
        this.webshopService.configureUser(this.username, undefined);
        this.router.navigate(['/home']);
    };
    AppComponent.prototype.register = function () {
        var _this = this;
        console.log("register: user: " + JSON.stringify(this.newUser, null, 2));
        if (!this.newUser.pk_username) {
            this.errorMessageAdd = "You need to provide an username. Please fix that and try again.";
            console.log("No Username");
            return;
        }
        if (!this.newUser.email) {
            this.errorMessageAdd = "You need to provide an email address. Please fix that and try again";
            console.log("No Email");
            return;
        }
        if (!this.newUserPW1 || !this.newUserPW2) {
            this.errorMessageAdd = "You need to provide your passwort and to repeated your passwort. Please fix that and try again.";
            console.log("No or not both passwords");
            return;
        }
        if (this.newUserPW1 != this.newUserPW2) {
            this.errorMessageAdd = "The password and the repeated password you provided do not match. Please fix that and try again.";
            console.log("No mathing passwords");
            return;
        }
        if (this.newUser.validyear) {
            if (isNaN(this.newUser.validyear) || (this.newUser.validyear < 2018) || (this.newUser.validyear > 2025)) {
                this.errorMessageAdd = "The year till that your credit card is valid to needs to be a number. Please fix that and try again.";
                console.log("Valid year is violates the rules");
                return;
            }
        }
        if (this.newUser.validmonth) {
            if (isNaN(this.newUser.validmonth) || (this.newUser.validmonth < 1) || (this.newUser.validmonth > 12)) {
                this.errorMessageAdd = "The month till that your credit card is valid to needs to be a number between 1 and 12. Please fix that and try again.";
                console.log("Validmonth is violates the rules");
                return;
            }
        }
        if (this.newUser.ccv) {
            if (isNaN(this.newUser.ccv) || (this.newUser.ccv < 0)) {
                this.errorMessageAdd = "The ccv of your credit card needs to be a number. Please fix that and try again.";
                console.log("CCV violates the rules");
                return;
            }
        }
        this.newUser.pwhash = this.newUserPW1;
        this.webshopService.postRegistration(this.newUser).then(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
            if (data) {
                // seems like it worked
                _this.successMessageAdd = "";
                _this.successMessageAdd = _this.successMessageAdd.concat("Successfully registered user '", _this.newUser.pk_username, "'. Please log in now.");
                // clean up..
                _this.newUser = { pk_username: "", email: "" };
                _this.newUserPW1 = undefined;
                _this.newUserPW2 = undefined;
                // this.errorMessageAdd = "";
                // this.successMessageAdd = "";
            }
        }).catch(function (err) {
            console.error(err);
            _this.errorMessageAdd = "Username may be taken. Please try another one";
        });
    };
    AppComponent.prototype.getProductGroups = function () {
        var _this = this;
        this.webshopService.getProductGroups().then(function (data) {
            _this.productgroups = data;
            console.log("data: " + JSON.stringify(data, null, 2));
            // do something else?
        }).catch(function (err) {
            console.error(err);
        });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__webshop_service__["a" /* WebshopService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_modal__ = __webpack_require__("../../../../ngx-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ngx_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__category_category_component__ = __webpack_require__("../../../../../src/app/category/category.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__profile_profile_component__ = __webpack_require__("../../../../../src/app/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shoppingcart_shoppingcart_component__ = __webpack_require__("../../../../../src/app/shoppingcart/shoppingcart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__webshop_service__ = __webpack_require__("../../../../../src/app/webshop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__search_search_component__ = __webpack_require__("../../../../../src/app/search/search.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var appRoutes = [
    { path: 'category/:id', component: __WEBPACK_IMPORTED_MODULE_8__category_category_component__["a" /* CategoryComponent */] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_9__profile_profile_component__["a" /* ProfileComponent */] },
    { path: 'shoppingcart', component: __WEBPACK_IMPORTED_MODULE_10__shoppingcart_shoppingcart_component__["a" /* ShoppingcartComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_12__home_home_component__["a" /* HomeComponent */] },
    { path: 'search', component: __WEBPACK_IMPORTED_MODULE_13__search_search_component__["a" /* SearchComponent */] },
    { path: 'search/:term', component: __WEBPACK_IMPORTED_MODULE_13__search_search_component__["a" /* SearchComponent */] },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
    // ,{ path: 'hero/:id',      component: HeroDetailComponent },
    // {
    //   path: 'heroes',
    //   component: HeroListComponent,
    //   data: { title: 'Heroes List' }
    // },
    // { path: '',
    //   redirectTo: '/heroes',
    //   pathMatch: 'full'
    // },
    // { path: '**', component: PageNotFoundComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__category_category_component__["a" /* CategoryComponent */],
                __WEBPACK_IMPORTED_MODULE_9__profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_10__shoppingcart_shoppingcart_component__["a" /* ShoppingcartComponent */],
                __WEBPACK_IMPORTED_MODULE_12__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_13__search_search_component__["a" /* SearchComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3_ngx_modal__["ModalModule"],
                __WEBPACK_IMPORTED_MODULE_6__angular_router__["RouterModule"].forRoot(appRoutes, { enableTracing: true } // <-- debugging purposes only
                )
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_11__webshop_service__["a" /* WebshopService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/category/category.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/category/category.component.html":
/***/ (function(module, exports) {

module.exports = "<h5 *ngIf=\"noProducts\">\n  We are sorry, but currently there no products available within that group.\n</h5>\n\n<div class=\"container-fluid\">\n    <div class=\"card-group\">\n      <div class=\"card\" *ngFor=\"let product of products; index as i\">\n        <div class=\"text-center\">\n          <img class=\"card-img-top\" src=\"/public/images/{{product.imagename}}\" alt=\"Image of {{product.name}}\">\n        </div>\n        <div class=\"card-block\">\n          <h4 class=\"card-title\">{{product.name}}</h4>\n          <p class=\"card-text\">{{product.description}}</p>\n        </div>\n        <ul class=\"list-group list-group-flush\">\n          <li class=\"list-group-item\">per {{product.soldper}}</li>\n          <li class=\"list-group-item\">Price: {{product.price}}&euro;</li>\n          <li class=\"list-group-item\">\n              <form class=\"form-inline\">\n                <label>Amount:</label>&nbsp;\n                <input class=\"form-control\" type=\"number\" min=\"0\" max=\"99\" ngMin=\"0\" ngMax=\"99\" name=\"{{product.pk_productid}}\" [(ngModel)]=\"product.orderdAmount\"/>&nbsp;\n              </form>\n          </li>\n          <li class=\"list-group-item\">\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"addProductToShoppingCart(product)\">\n              <span><i class=\"fa fa-cart-plus\" aria-hidden=\"true\"></i></span>\n            </button>\n          </li>\n        </ul>\n        <div class=\"card-footer\">\n          <small class=\"text-muted\">We <span><i class=\"fa fa-heart\" aria-hidden=\"true\"></i>\n          </span> Food </small>\n        </div>\n      </div>\n    </div>\n    <br/>\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/category/category.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webshop_service__ = __webpack_require__("../../../../../src/app/webshop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(webshopService, route) {
        var _this = this;
        this.webshopService = webshopService;
        this.route = route;
        this.products = [];
        // id : number;
        // foo: string;
        this.errorMessage = undefined;
        this.noProducts = false;
        this.route.params.subscribe(function (params) {
            console.log("PARAMS: " + JSON.stringify(params, null, 2));
            _this.getProductsOfCategory(+params['id']);
        });
    }
    CategoryComponent.prototype.ngOnInit = function () {
        // this.webshopService.getProducts().then((data) =>{
        //   this.products = data;
        //   // console.log("data: " + JSON.stringify(data));
        // }).catch(err => console.error(err));
    };
    CategoryComponent.prototype.getProductsOfCategory = function (p) {
        var _this = this;
        console.log("here now.");
        console.log("getProducts: " + p);
        // getProducts
        this.webshopService.getProducts(p).then(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
            if (data.length > 0) {
                // seems like everythink worked fine
                _this.products = data;
                _this.noProducts = false;
            }
            else {
                _this.products = undefined;
                _this.noProducts = true;
            }
        }).catch(function (err) {
            console.error(err);
        });
    };
    CategoryComponent.prototype.addProductToShoppingCart = function (p) {
        console.log("wuhu");
        console.log("ordered Amount: " + p.orderdAmount);
        console.log("available Amount: " + p.amountavailable);
        var user = this.webshopService.getUsername();
        if (!user) {
            window.alert("Sorry, but you need to be logged in to order something.");
            return;
        }
        if (isNaN(p.orderdAmount) || (p.orderdAmount < 0)) {
            window.alert("Sorry, but " + p.amountavailable + " isn't a valid amount to order. Please fix that and try again.");
            return;
        }
        if (p.orderdAmount > p.amountavailable) {
            console.log("Not enough pieces available.");
            window.alert("Sorry, but we only have " + p.amountavailable + " pieces of " + p.name + ". Please update your wanted amount of product " + p.name + " and try it again.");
            return;
        }
        this.webshopService.postCartItem(p).then(function (data) {
            if (data) {
                // seems like it worked fine
                window.alert("Added " + p.orderdAmount + " pieces of " + p.name + " to your shopping cart.");
            }
        }).catch(function (err) {
            console.error(err);
            window.alert("Sorry, but something went wrong. Please try again.");
        });
    };
    CategoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-category',
            template: __webpack_require__("../../../../../src/app/category/category.component.html"),
            styles: [__webpack_require__("../../../../../src/app/category/category.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__webshop_service__["a" /* WebshopService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]])
    ], CategoryComponent);
    return CategoryComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <p>\n  home works!\n</p> -->\n<div class=\"container-fluid\">\n    <div class=\"card-group\">\n      <div class=\"card\" *ngFor=\"let product of products; index as i\">\n        <div class=\"text-center\">\n          <img class=\"card-img-top\" src=\"/public/images/{{product.imagename}}\" alt=\"Image of {{product.name}}\">\n        </div>\n        <div class=\"card-block\">\n          <h4 class=\"card-title\">{{product.name}}</h4>\n          <p class=\"card-text\">{{product.description}}</p>\n        </div>\n        <ul class=\"list-group list-group-flush\">\n          <li class=\"list-group-item\">per {{product.soldper}}</li>\n          <li class=\"list-group-item\">Price: {{product.price}}&euro;</li>\n          <li class=\"list-group-item\">\n              <form class=\"form-inline\">\n                <label>Amount:</label>&nbsp;\n                <input class=\"form-control\" type=\"number\" min=\"0\" max=\"99\" ngMin=\"0\" ngMax=\"99\" name=\"{{product.pk_productid}}\" id=\"{{product.pk_productid}}\" [(ngModel)]=\"product.orderdAmount\"/>&nbsp;\n              </form>\n          </li>\n          <li class=\"list-group-item\">\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"addProductToShoppingCart(product)\">\n              <span><i class=\"fa fa-cart-plus\" aria-hidden=\"true\"></i></span>\n            </button>\n          </li>\n        </ul>\n        <div class=\"card-footer\">\n          <small class=\"text-muted\">We <span><i class=\"fa fa-heart\" aria-hidden=\"true\"></i>\n          </span> Food </small>\n        </div>\n      </div>\n    </div>\n    <br/>\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webshop_service__ = __webpack_require__("../../../../../src/app/webshop.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(webshopService) {
        this.webshopService = webshopService;
        this.products = [];
        // webshopService.configureEndpoint("http://localhost:8088", "admin", "admin");
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.webshopService.getProducts().then(function (data) {
            _this.products = data;
            console.log("data: " + JSON.stringify(data));
            // this.sortProducts();
        }).catch(function (err) { return console.error(err); });
    };
    HomeComponent.prototype.addProductToShoppingCart = function (p) {
        console.log("wuhu");
        console.log("ordered Amount: " + p.orderdAmount);
        console.log("available Amount: " + p.amountavailable);
        var user = this.webshopService.getUsername();
        if (!user) {
            window.alert("Sorry, but you need to be logged in to order something.");
            return;
        }
        if (isNaN(p.orderdAmount) || (p.orderdAmount < 0)) {
            window.alert("Sorry, but " + p.amountavailable + " isn't a valid amount to order. Please fix that and try again.");
            return;
        }
        if (p.orderdAmount > p.amountavailable) {
            console.log("Not enough pieces available.");
            window.alert("Sorry, but we only have " + p.amountavailable + " pieces of " + p.name + ". Please update your wanted amount of product " + p.name + " and try it again.");
            return;
        }
        this.webshopService.postCartItem(p).then(function (data) {
            if (data) {
                // seems like it worked fine
                window.alert("Added " + p.orderdAmount + " pieces of " + p.name + " to your shopping cart.");
            }
        }).catch(function (err) {
            console.error(err);
            window.alert("Sorry, but something went wrong. Please try again.");
        });
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__webshop_service__["a" /* WebshopService */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/profile/profile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\" *ngIf=\"user\">\n  <h1>\n    Hello {{user.pk_username}}!\n  </h1>\n  <br/>\n\n  <!-- show which tab is active is not working -->\n  <ul class=\"nav nav-tabs\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link active\" data-toggle=\"tab\" role=\"tab\" (click)=\"showPrevOrders = false; showUserManagement = false; showProductManagement = false; showOrderManagement = false; showProfileDetails = true\">Profile Details</a>\n    </li>\n    <li class=\"nav-item\">\n      <a class=\"nav-link\" data-toggle=\"tab\" role=\"tab\" (click)=\"showProfileDetails = false; showUserManagement = false; showProductManagement = false; showOrderManagement = false; showPrevOrders = true;\">Previous Orders</a>\n    </li>\n    <li class=\"nav-item\" *ngIf=\"isAdmin\">\n      <a class=\"nav-link\" data-toggle=\"tab\" role=\"tab\" (click)=\"showPrevOrders = false; showProfileDetails = false; showProductManagement = false; showOrderManagement = false; showUserManagement = true;\">User Management</a>\n    </li>\n    <li class=\"nav-item\" *ngIf=\"isAdmin\">\n      <a class=\"nav-link\" data-toggle=\"tab\" role=\"tab\" (click)=\"showPrevOrders = false; showProfileDetails = false; showUserManagement = false; showOrderManagement = false; showProductManagement = true\">Product Management</a>\n    </li>\n    <li class=\"nav-item\" *ngIf=\"isAdmin\">\n      <a class=\"nav-link\" data-toggle=\"tab\" role=\"tab\" (click)=\"showPrevOrders = false; showProfileDetails = false; showUserManagement = false; showProductManagement = false; showOrderManagement = true\">Order Management</a>\n    </li>\n\n    <!-- <li class=\"nav-item\">\n      <a class=\"nav-link\" href=\"#\">Link</a>\n    </li>\n    <li class=\"nav-item\">\n      <a class=\"nav-link disabled\" href=\"#\">Disabled</a>\n    </li> -->\n</ul>\n\n<br/>\n\n\n  <form *ngIf=\"showProfileDetails\">\n    <div class=\"form-group\">\n      <label><b>Name</b></label>\n      <input type=\"text\" class=\"form-control\" name=\"pName\" [(ngModel)]=\"user.name\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>Surname</b></label>\n      <input type=\"text\" class=\"form-control\" name=\"pSurname\" [(ngModel)]=\"user.surname\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>Email address</b></label>\n      <input type=\"email\" class=\"form-control\" name=\"pEmail\" [(ngModel)]=\"user.email\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>New Password</b></label>\n      <input type=\"password\" class=\"form-control\" name=\"pPW1\" [(ngModel)]=\"newPassword\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>Repeat Password</b></label>\n      <input type=\"password\" class=\"form-control\" name=\"pPW2\" [(ngModel)]=\"newPasswordRepeat\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>Company-Name</b></label>\n      <input type=\"text\" class=\"form-control\" name=\"pCompanyName\" [(ngModel)]=\"user.companyname\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>Billing Address</b></label>\n      <input type=\"text\" class=\"form-control\" name=\"pBillingAddress\" [(ngModel)]=\"user.billingaddress\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>Delivery Address</b></label>\n      <input type=\"text\" class=\"form-control\" name=\"pDeliveryAddress\" [(ngModel)]=\"user.deliveryaddress\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>VAT</b></label>\n      <input type=\"text\" class=\"form-control\" name=\"pVat\" [(ngModel)]=\"user.vat\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>Creditcard Number</b></label>\n      <input type=\"text\" class=\"form-control\" name=\"pCCNr\" [(ngModel)]=\"user.creditcardnr\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>Creditcard Validyead</b></label>\n      <input type=\"number\" class=\"form-control\" name=\"pValidYear\" min=\"0\" max=\"4000\" ngMin=\"0\" ngMax=\"4000\" [(ngModel)]=\"user.validyear\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>Creditcard Validmonth</b></label>\n      <input type=\"number\" class=\"form-control\" min=\"0\" max=\"12\" ngMin=\"0\" ngMax=\"12\" name=\"pValidMonth\" [(ngModel)]=\"user.validmonth\">\n    </div>\n    <div class=\"form-group\">\n      <label><b>Creditcard CCV</b></label>\n      <input type=\"text\" class=\"form-control\" name=\"pNameOnCC\" [(ngModel)]=\"user.ccv\">\n    </div>\n    <br *ngIf=\"errorMessage\"/>\n    <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"errorMessage\">{{errorMessage}}\n      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"errorMessage = ''\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <br *ngIf=\"successMessage\"/>\n    <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" *ngIf=\"successMessage\">{{successMessage}}\n      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"successMessage = ''\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <button type=\"button\" class=\"btn btn-lg btn-block btn-success\" (click)=\"saveChanges()\">Save Changes\n      <span><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i></span>\n    </button>\n    <button type=\"button\" class=\"btn btn-lg btn-block btn-danger\" (click)=\"deleteUser()\">Delete Profile\n      <span><i class=\"fa fa-user-times\" aria-hidden=\"true\"></i></span>\n    </button>\n  </form>\n  <br/>\n\n<!-- <div class=\"container-fluid\"> -->\n  <div *ngIf=\"showPrevOrders\">\n    <h4> Your orders: </h4>\n    <p>&nbsp;</p>\n    <h5 *ngIf=\"noOrders\">\n      We didn't find any previous orders of you.\n    </h5>\n    <div class=\"list-group\">\n      <div *ngFor=\"let order of orders; index as i\">\n        <button type=\"button\" name={{order.pk_orderid}} class=\"list-group-item list-group-item-action justify-content-between\" (click)=\"order.showDetails = !order.showDetails\">\n          <h5>{{formatDate(order.orderdate)}}</h5>\n          <span>\n            <span class=\"badge badge-default\"> {{order.items.length}} Items ordered</span>\n            <span class=\"badge badge-danger\" *ngIf=\"order.paymentstate == 'open'\"> not paid</span>\n            <span class=\"badge badge-success\" *ngIf=\"order.paymentstate == 'payed'\"> paid</span>\n          </span>\n        </button>\n        <form *ngIf=\"order.showDetails\">\n          <br/>\n          <p>\n            <b>OrderID: </b>\n            {{order.pk_orderid}}\n          </p>\n          <p *ngIf=\"order.deliverydate\">\n            <b>Delivery date: </b>\n            {{order.deliverydate}}\n          </p>\n          <p>\n            <b>Payment Status: </b>\n            {{order.paymentstate}}\n          </p>\n          <p>\n            <b>Paymentmethod: </b>\n            {{order.paymentmethod}}\n          </p>\n          <p>\n            <b>Overall Price: </b>\n            {{order.price}}\n          </p>\n\n        \t<div *ngFor=\"let item of order.items\">\n            <!-- TODO: oderitems when get order is fixed.. -->\n            <p *ngIf=\"item.productName\">\n              <b>Item bought: </b>\n              {{item.productName}}\n            </p>\n            <p *ngIf=\"order.deliverydate || order.paymentmethod == 'payed'\">\n              <b>Item amount: </b>\n              {{item.amount}}\n            </p>\n            <p *ngIf=\"!order.deliverydate && order.paymentmethod != 'payed'\">\n                <b>Item amount: </b>\n                {{item.amount}}\n              </p>\n\n            <p >\n              <div class=\"form-group\" *ngIf=\"!order.deliverydate && order.paymentmethod != 'payed'\">\n                  <label><b>Item amount</b></label>\n                  <input type=\"text\" class=\"form-control\" name=\"amount\" [(ngModel)]=\"item.amount\">\n              </div>\n            \n\n            <p>\n              <b>Item price: </b>\n              {{item.price}}\n            </p>\n\n\n          </div>\n\n          <div *ngIf=\"!order.deliverydate && order.paymentmethod != 'payed'\">\n              <button type=\"button\" class=\"btn btn-lg btn-block btn-success\" (click)=\"saveOrderChanges(i)\">Save Changes\n                  <span><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i></span>\n                </button>\n                <button type=\"button\" class=\"btn btn-lg btn-block btn-danger\" (click)=\"deleteOrder(i)\">Delete Order\n                  <span><i class=\"fa fa-user-times\" aria-hidden=\"true\"></i></span>\n                </button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n\n\n\n\n\n  <div *ngIf=\"showUserManagement\">\n    <!-- <p>&nbsp;</p> -->\n    <h4> All Users: </h4>\n    <p>&nbsp;</p>\n    <div class=\"list-group\">\n      <div *ngFor=\"let u of users; index as i\">\n        <button type=\"button\" name={{u.pk_username}} class=\"list-group-item list-group-item-action\" (click)=\"u.showDetails = !u.showDetails\">\n          {{u.pk_username}}\n        </button>\n        <!-- <br/> -->\n        <div *ngIf=\"u.showDetails\">\n          <br/>\n          <p><b>Name: </b> {{u.name}}</p>\n          <p><b>Surname: </b> {{u.surname}}</p>\n          <p>\n             <input type=\"checkbox\" name=\"admin_{{i}}\" [(ngModel)]=\"u.isadmin\"> Admin Rights\n          </p>\n          <br *ngIf=\"u.errorMessageEdit\"/>\n          <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"u.errorMessageEdit\">{{u.errorMessageEdit}}\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"u.errorMessageEdit = ''\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <br *ngIf=\"u.successMessageEdit\"/>\n          <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" *ngIf=\"u.successMessageEdit\">{{u.successMessageEdit}}\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"u.successMessageEdit = ''\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <button type=\"button\" class=\"btn btn-sm btn-outline-success\" (click)=\"saveChangesAdmin(u)\">Save Changes\n            <span><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i></span>\n          </button>\n          <button type=\"button\" class=\"btn btn-sm btn-outline-danger\" (click)=\"deleteUser(u)\">Delete Profile\n            <span><i class=\"fa fa-user-times\" aria-hidden=\"true\"></i></span>\n          </button>\n          <p>&nbsp;</p>\n          <br/>\n        </div>\n      </div>\n\n\n        <!-- <div *ngIf=\"u.showDetails\">\n        </div> -->\n      </div>\n  </div>\n\n  <div *ngIf=\"showProductManagement\">\n    <h4> Products: </h4>\n    <br/>\n    <button type=\"button\" class=\"btn btn-outline-success\" (click)=\"showAddProduct = !showAddProduct\">\n      Add New Product <span><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\n    </button>\n    <br/>\n\n    <form *ngIf=\"showAddProduct\">\n      <br/>\n      <div class=\"form-group\">\n        <label><b>Name</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"prodName\" [(ngModel)]=\"newProduct.name\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Description</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"prodDescription\" [(ngModel)]=\"newProduct.description\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Sold per</b></label>\n        <input type=\"email\" class=\"form-control\" name=\"prodSoldPer\" [(ngModel)]=\"newProduct.soldper\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Price</b></label>\n        <input type=\"number\" class=\"form-control\" name=\"prodPrice\" min=\"0\" max=\"4000\" ngMin=\"0\" ngMax=\"4000\" [(ngModel)]=\"newProduct.price\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Available Amount</b></label>\n        <input type=\"number\" class=\"form-control\" name=\"prodAvailableAmount\" min=\"0\" max=\"4000\" ngMin=\"0\" ngMax=\"4000\" [(ngModel)]=\"newProduct.amountavailable\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>VAT rate</b></label>\n        <input type=\"number\" class=\"form-control\" name=\"prodVatRate\" min=\"0\" max=\"4000\" ngMin=\"0\" ngMax=\"4000\" [(ngModel)]=\"newProduct.vatrate\">\n      </div>\n      <div class=\"form-group\">\n        <label><b>Imagename</b></label>\n        <input type=\"text\" class=\"form-control\" name=\"prodImageName\" [(ngModel)]=\"newProduct.imagename\">\n      </div>\n      <br *ngIf=\"errorMessageAddProd\"/>\n      <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"errorMessageAddProd\">{{errorMessageAddProd}}\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"errorMessageAddProd = ''\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <br *ngIf=\"successMessageAddProd\"/>\n      <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" *ngIf=\"successMessageAddProd\">{{successMessageAddProd}}\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"successMessageAddProd = ''\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <button type=\"button\" class=\"btn btn-sm btn-outline-success\" (click)=\"addNewProduct()\">Add New Product\n        <span><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\n      </button>\n      <button type=\"button\" class=\"btn btn-sm btn-outline-danger\" (click)=\"showAddProduct = false\">Cancel\n        <span><i class=\"fa fa-user-times\" aria-hidden=\"true\"></i></span>\n      </button>\n    </form>\n    <br/>\n\n\n    <div class=\"list-group\">\n      <div *ngFor=\"let p of products; index as i\">\n        <br/>\n        <button type=\"button\" name={{p.pk_productid}} class=\"list-group-item list-group-item-action\" (click)=\"p.showDetails = !p.showDetails\">\n          {{p.name}} - ID: {{p.pk_productid}}\n        </button>\n        <br/>\n        <div *ngIf=\"p.showDetails\">\n          <label><b>Name: </b></label>\n          <input class=\"form-control\" name=\"prName\" type=\"text\" [(ngModel)]=\"p.name\"/>&nbsp;\n          <br/>\n          <label><b>Description: </b></label>\n          <input class=\"form-control\" name=\"prDescr\" type=\"text\" [(ngModel)]=\"p.description\"/>&nbsp;\n          <br/>\n          <label><b>Sold per: </b></label>\n          <input class=\"form-control\" name=\"prSoldPer\" type=\"text\" [(ngModel)]=\"p.soldper\"/>&nbsp;\n          <br/>\n          <label><b>Price: </b></label>\n          <input class=\"form-control\" name=\"prPrice\" type=\"text\" [(ngModel)]=\"p.price\"/>&nbsp;\n          <br/>\n          <label><b>Available Amount: </b></label>\n          <input class=\"form-control\" type=\"number\" min=\"0\" max=\"99\" ngMin=\"0\" ngMax=\"99\" name=\"{{p.pk_productid}}\" [(ngModel)]=\"p.amountavailable\"/>&nbsp;\n          <br *ngIf=\"p.errorMessage\"/>\n          <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"p.errorMessage\">{{p.errorMessage}}\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"p.errorMessage = ''\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <br *ngIf=\"p.successMessage\"/>\n          <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" *ngIf=\"p.successMessage\">{{p.successMessage}}\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"p.successMessage = ''\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <br/>\n          <button type=\"button\" class=\"btn btn-outline-success\" (click)=\"updateProduct(p)\">\n            SaveChanges <span><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i></span>\n          </button>\n          <!-- <button type=\"button\" class=\"btn btn-outline-danger\" (click)=\"deleteProduct(p)\">\n            Delete Product <span><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span>\n          </button> -->\n          <br/> &nbsp;\n        </div>\n    </div>\n  </div>\n</div>\n\n  <div *ngIf=\"showOrderManagement\">\n    <h4> All Orders: </h4>\n    <br/>\n    <h5 *ngIf=\"noAllOrders\">\n      We didn't find any previous orders.\n    </h5>\n    <div class=\"list-group\">\n      <div *ngFor=\"let o of allOrders; index as i\">\n        <button type=\"button\" name={{o.pk_orderid}} class=\"list-group-item list-group-item-action justify-content-between\" (click)=\"o.showDetails = !o.showDetails\">\n          <h5>{{formatDate(o.orderdate)}}</h5>\n          <span>\n            <span class=\"badge badge-default\"> {{o.items.length}} Items ordered</span>\n            <span class=\"badge badge-danger\" *ngIf=\"o.paymentstate == 'open'\"> not paid</span>\n            <span class=\"badge badge-success\" *ngIf=\"o.paymentstate == 'payed'\"> paid</span>\n          </span>\n        </button>\n        <div *ngIf=\"o.showDetails\">\n          <br/>\n          <p>\n            <b>OrderID: </b>\n            {{o.pk_orderid}}\n          </p>\n          <p *ngIf=\"o.deliverydate\">\n            <b>Delivery date: </b>\n            {{o.deliverydate}}\n          </p>\n          <p>\n            <b>Payment Status: </b>\n            {{o.paymentstate}}\n          </p>\n          <p>\n            <b>Paymentmethod: </b>\n            {{o.paymentmethod}}\n          </p>\n          <p>\n            <b>Overall Price: </b>\n            {{o.price}}\n          </p>\n\n          <div class=\"list-group\">\n            <div *ngFor=\"let oi of o.items; index as j\">\n              <button type=\"button btn-sm\" name={{oi.productName}} class=\"list-group-item list-group-item-action justify-content-between\" (click)=\"oi.showDetails = !oi.showDetails\">\n                {{oi.productName}}\n                <span>\n                  <span class=\"badge badge-default\"> {{oi.amount}} pieces</span>\n                </span>\n              </button>\n              <div *ngIf=\"oi.showDetails\">\n                <br/>\n                <p *ngIf=\"oi.productName\">\n                  <b>Product: </b>\n                  {{oi.productName}}\n                </p>\n                <p>\n                  <b>Ordered Amount: </b>\n                  {{oi.amount}}\n                </p>\n                <p>\n                  <b>Item price: </b>\n                  {{oi.price}}\n                </p>\n              </div>\n          </div>\n        </div>\n\n        <br/>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webshop_service__ = __webpack_require__("../../../../../src/app/webshop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(webshopService, router) {
        this.webshopService = webshopService;
        this.router = router;
        this.isAdmin = false;
        this.orders = [];
        this.allOrders = [];
        this.users = [];
        this.products = [];
        this.newProduct = { pk_productid: null, name: "", soldper: "", price: null, amountavailable: null, vatrate: null, fk_groupid: null };
        this.showPrevOrders = false;
        this.showProfileDetails = true;
        this.showUserManagement = false;
        this.showOrderManagement = false;
        this.newPassword = undefined;
        this.newPasswordRepeat = undefined;
        this.errorMessage = undefined;
        this.successMessage = undefined;
        this.errorMessageEdit = undefined;
        this.successMessageEdit = undefined;
        this.noOrders = false;
        this.noAllOrders = false;
        this.showAddProduct = false;
        this.errorMessageAddProd = undefined;
        this.successMessageAddProd = undefined;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getUserByUsername();
        this.getOrdersByUsername();
        this.isAdmin = this.webshopService.getUserIsAdmin();
        if (this.isAdmin) {
            this.getUsers();
            this.getProducts();
            this.getOrders();
        }
    };
    ProfileComponent.prototype.getUserByUsername = function () {
        var _this = this;
        this.webshopService.getUsers(this.webshopService.getUsername()).then(function (data) {
            var users = data;
            console.log("data: " + JSON.stringify(data, null, 2));
            if (users.length == 1) {
                // found the users profile
                _this.user = users[0];
            }
            else {
                // should not happen...
                // TODO: error handling
            }
        }).catch(function (err) {
            console.error(err);
            _this.router.navigate(['/home']);
        });
    };
    ProfileComponent.prototype.getUsers = function () {
        var _this = this;
        this.webshopService.getUsers().then(function (data) {
            var users = data;
            console.log("data: " + JSON.stringify(data, null, 2));
            _this.users = data;
        }).catch(function (err) {
            console.error(err);
            _this.router.navigate(['/home']);
        });
    };
    ProfileComponent.prototype.getProducts = function () {
        var _this = this;
        this.webshopService.getProducts().then(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
            _this.products = data;
        }).catch(function (err) {
            console.error(err);
            _this.router.navigate(['/home']);
        });
    };
    ProfileComponent.prototype.saveChanges = function () {
        var _this = this;
        console.log("user: " + JSON.stringify(this.user, null, 2));
        if (this.newPassword) {
            if (!this.newPasswordRepeat) {
                // display error message
                this.errorMessage = "The password and the repeated password do not match. Please fix this and try again.";
                return;
            }
            else {
                this.user.pwhash = this.newPassword;
            }
        }
        else if (this.newPasswordRepeat) {
            if (!this.newPassword) {
                // display error message
                this.errorMessage = "The password and the repeated password do not match. Please fix this and try again.";
                return;
            }
        }
        if (!this.newPassword && !this.newPasswordRepeat) {
            this.user.pwhash = "PW";
        }
        if (!(this.newPassword == this.newPasswordRepeat)) {
            // display error message
            this.errorMessage = "The password and the repeated password do not match. Please fix this and try again.";
            return;
        }
        if (!this.user.email) {
            // display error message
            this.errorMessage = "You need to provide an email address. Please fix this and try again.";
            return;
        }
        this.webshopService.putUser(this.user).then(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
            if (data) {
                // seems like it worked
                _this.successMessage = "Successfully updated your profile.";
                // this.user = undefined;
                return;
            }
            else {
                // should not happen...
                _this.errorMessage = "We are sorry, but an error occured. Please try again later.";
            }
        }).catch(function (err) {
            console.error(err);
            _this.errorMessage = "";
            _this.errorMessage.concat("We are sorry, but an error occurred: ", err);
        });
    };
    ProfileComponent.prototype.deleteUser = function (u) {
        var _this = this;
        this.webshopService.deleteUser(u)
            .then(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
            if (data) {
                // seems like it worked
                if (u) {
                    u.successMessageEdit = "Successfully deleted " + (u ? u.pk_username.concat('s') : 'your') + " profile.";
                }
                else {
                    _this.successMessage = "Successfully deleted " + (u ? u.pk_username.concat('s') : 'your') + " profile.";
                }
            }
        }).catch(function (err) {
            console.error(err);
            if (u) {
                u.errorMessageEdit = u.pk_username + " may have open bills. Users with open bills cannot be deleted.";
            }
            else {
                _this.errorMessage = "You may have open bills. Users with open bills cannot be deleted.";
            }
        });
    };
    ProfileComponent.prototype.saveChangesAdmin = function (u) {
        var _this = this;
        console.log("USER TO CHANGE: " + JSON.stringify(u));
        u.pwhash = undefined;
        this.webshopService.putUser(u).then(function (data) {
            // need to get and set his password.... otherwise the new password is the hashed pwhash
            console.log("data: " + JSON.stringify(data, null, 2));
            if (data) {
                // seems like it worked
                _this.successMessageEdit = "Successfully updated your profile.";
                // this.user = undefined;
                return;
            }
            else {
                // should not happen...
                _this.errorMessageEdit = "We are sorry, but an error occured. Please try again later.";
            }
        }).catch(function (err) {
            console.error(err);
            _this.errorMessageEdit = "";
            _this.errorMessageEdit.concat("We are sorry, but an error occurred: ", err);
        });
    };
    ProfileComponent.prototype.getOrdersByUsername = function () {
        var _this = this;
        this.webshopService.getOrdersByUsername(this.webshopService.getUsername()).then(function (data) {
            console.log("ORDERS OF USER: " + JSON.stringify(data, null, 2));
            if (data) {
                // seems like it worked
                _this.orders = data;
                console.log("this.orders[0].orderdate : " + __WEBPACK_IMPORTED_MODULE_3_moment__().format(_this.orders[0].orderdate));
                _this.noOrders = false;
                //go through all elements and find out their name
                _this.webshopService.getProducts().then(function (data) {
                    var prod = data;
                    var i = 0;
                    for (; i < _this.orders.length; i++) {
                        var h = 0;
                        for (; h < _this.orders[i].items.length; h++) {
                            //Search for the product of this item
                            var a = 0;
                            var name_1 = void 0;
                            for (; a < prod.length && name_1 === undefined; a++) {
                                if (prod[a].pk_productid == _this.orders[i].items[h].fk_productid) {
                                    name_1 = prod[a].name;
                                }
                            }
                            _this.orders[i].items[h].productName = name_1;
                        }
                    }
                });
            }
            else {
                _this.orders = undefined;
                _this.noOrders = true;
            }
        }).catch(function (err) {
            console.error(err);
            _this.orders = undefined;
            _this.noOrders = true;
        });
    };
    ProfileComponent.prototype.getOrders = function () {
        var _this = this;
        this.webshopService.getOrders().then(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
            if (data) {
                // seems like it worked
                _this.allOrders = data;
                console.log("this.orders[0].orderdate : " + __WEBPACK_IMPORTED_MODULE_3_moment__().format(_this.allOrders[0].orderdate));
                _this.noAllOrders = false;
                //go through all elements and find out their name
                _this.webshopService.getProducts().then(function (data) {
                    var prod = data;
                    var i = 0;
                    for (; i < _this.allOrders.length; i++) {
                        var h = 0;
                        for (; h < _this.allOrders[i].items.length; h++) {
                            //Search for the product of this item
                            var a = 0;
                            var name_2 = void 0;
                            for (; a < prod.length && name_2 === undefined; a++) {
                                if (prod[a].pk_productid == _this.allOrders[i].items[h].fk_productid) {
                                    name_2 = prod[a].name;
                                }
                            }
                            _this.allOrders[i].items[h].productName = name_2;
                        }
                    }
                });
            }
            else {
                _this.allOrders = undefined;
                _this.noAllOrders = true;
            }
        }).catch(function (err) {
            console.error(err);
            _this.allOrders = undefined;
            _this.noAllOrders = true;
        });
    };
    ProfileComponent.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('MMMM Do YYYY, h:mm:ss a');
    };
    ProfileComponent.prototype.updateProduct = function (p) {
        var _this = this;
        this.webshopService.putProduct(p).then(function (data) {
            if (data) {
                // seems like it worked
                p.successMessage = "Successfully updated the product.";
                // this.user = undefined;
                return;
            }
            else {
                // should not happen...
                p.errorMessage = "We are sorry, but an error occured. Please try again later.";
            }
        }).catch(function (err) {
            console.error(err);
            _this.errorMessageEdit = "";
            _this.errorMessageEdit.concat("We are sorry, but an error occurred: ", err);
        });
    };
    ProfileComponent.prototype.deleteProduct = function (p) {
        var _this = this;
        this.webshopService.deleteProduct(p).then(function (data) {
            if (data) {
                // seems like it worked
                p.successMessage = "Successfully deleted the product.";
                // this.user = undefined;
                return;
            }
            else {
                // should not happen...
                p.errorMessage = "We are sorry, but an error occured. Please try again later.";
            }
        }).catch(function (err) {
            console.error(err);
            _this.errorMessageEdit = "";
            _this.errorMessageEdit.concat("We are sorry, but an error occurred: ", err);
        });
    };
    ProfileComponent.prototype.addNewProduct = function () {
        var _this = this;
        console.log(JSON.stringify(this.newProduct, null, 2));
        if (!this.newProduct.name) {
            this.errorMessageAddProd = "The field 'Name' is a required field. Please fix this and try again.";
            return;
        }
        if (!this.newProduct.soldper) {
            this.errorMessageAddProd = "The field 'Sold per' is a required field. Please fix this and try again.";
            return;
        }
        if (!this.newProduct.price && (this.newProduct.price < 0)) {
            this.errorMessageAddProd = "The field 'Price' is a required field. Please fix this and try again.";
            return;
        }
        if (!this.newProduct.amountavailable) {
            this.errorMessageAddProd = "The field 'Available Amount' is a required field. Please fix this and try again.";
            return;
        }
        if (!this.newProduct.vatrate) {
            this.errorMessageAddProd = "The field 'VAT Rate' is a required field. Please fix this and try again.";
            return;
        }
        if (!this.newProduct.fk_groupid) {
            // TODO: find category other & give options for group selection!
            this.newProduct.fk_groupid = 5;
        }
        this.webshopService.postProduct(this.newProduct).then(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
            if (data) {
                // seems like it worked
                _this.successMessageAddProd = "Successfully added new product.";
                _this.newProduct = { pk_productid: null, name: "", soldper: "", price: null, amountavailable: null, vatrate: null, fk_groupid: null };
                return;
            }
            else {
                // should not happen...
                _this.errorMessageAddProd = "We are sorry, but an error occured. Please try again later.";
            }
        }).catch(function (err) {
            console.error(err);
            _this.errorMessageAddProd = "";
            _this.errorMessageAddProd.concat("We are sorry, but an error occurred: ", err);
        });
    };
    ProfileComponent.prototype.saveOrderChanges = function (p) {
        var _this = this;
        this.webshopService.putOrder(this.orders[p]).then(function (data) {
            if (data) {
                // seems like it worked
                _this.successMessage = "Successfully updated the product.";
                // this.user = undefined;
                return;
            }
            else {
                // should not happen...
                _this.errorMessage = "We are sorry, but an error occured. Please try again later.";
            }
        }).catch(function (err) {
            console.error(err);
            _this.errorMessageEdit = "";
            _this.errorMessageEdit.concat("We are sorry, but an error occurred: ", err);
        });
    };
    ProfileComponent.prototype.deleteOrder = function (p) {
        var _this = this;
        if (this.orders[p].deliverydate === undefined || this.orders[p].deliverydate == null) {
            this.webshopService.deleteOrder(this.orders[p]).then(function (data) {
                if (data) {
                    // seems like it worked
                    _this.successMessage = "Successfully deleted the order.";
                    // this.user = undefined;
                    return;
                }
                else {
                    // should not happen...
                    _this.errorMessage = "We are sorry, but an error occured. Please try again later.";
                }
            }).catch(function (err) {
                console.error(err);
                _this.errorMessageEdit = "";
                _this.errorMessageEdit.concat("We are sorry, but an error occurred: ", err);
            });
        }
        else {
            this.errorMessage = "This product is already sent to you. You can't remove this order.";
        }
    };
    ProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__("../../../../../src/app/profile/profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/profile/profile.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__webshop_service__["a" /* WebshopService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "../../../../../src/app/search/search.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/search/search.component.html":
/***/ (function(module, exports) {

module.exports = "<h5 *ngIf=\"noResultsFound\">\n  We are sorry, but we did not found any matching products.\n</h5>\n\n<div class=\"container-fluid\">\n    <div class=\"card-group\">\n      <div class=\"card\" *ngFor=\"let product of products; index as i\">\n        <div class=\"text-center\">\n          <img class=\"card-img-top\" src=\"/public/images/{{product.imagename}}\" alt=\"Image of {{product.name}}\">\n        </div>\n        <div class=\"card-block\">\n          <h4 class=\"card-title\">{{product.name}}</h4>\n          <p class=\"card-text\">{{product.description}}</p>\n        </div>\n        <ul class=\"list-group list-group-flush\">\n          <li class=\"list-group-item\">per {{product.soldper}}</li>\n          <li class=\"list-group-item\">Price: {{product.price}}&euro;</li>\n          <li class=\"list-group-item\">\n              <form class=\"form-inline\">\n                <label>Amount:</label>&nbsp;\n                <input class=\"form-control\" type=\"number\" min=\"0\" max=\"99\" ngMin=\"0\" ngMax=\"99\" name=\"{{product.pk_productid}}\" [(ngModel)]=\"product.orderdAmount\"/>&nbsp;\n              </form>\n          </li>\n          <li class=\"list-group-item\">\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"addProductToShoppingCart(product)\">\n              <span><i class=\"fa fa-cart-plus\" aria-hidden=\"true\"></i></span>\n            </button>\n          </li>\n        </ul>\n        <div class=\"card-footer\">\n          <small class=\"text-muted\">We <span><i class=\"fa fa-heart\" aria-hidden=\"true\"></i>\n          </span> Food </small>\n        </div>\n      </div>\n    </div>\n    <br/>\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webshop_service__ = __webpack_require__("../../../../../src/app/webshop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchComponent = /** @class */ (function () {
    function SearchComponent(webshopService, route) {
        var _this = this;
        this.webshopService = webshopService;
        this.route = route;
        this.products = [];
        this.noResultsFound = false;
        this.route.params.subscribe(function (params) {
            console.log("PARAMS: " + JSON.stringify(params, null, 2));
            _this.startSearch(params['term']);
        });
    }
    SearchComponent.prototype.ngOnInit = function () {
    };
    SearchComponent.prototype.startSearch = function (term) {
        var _this = this;
        console.log("TERM : " + term);
        this.webshopService.getProducts(null, term).then(function (data) {
            console.log("SEARCH data: " + JSON.stringify(data, null, 2));
            if (data.length > 0) {
                // seems like everythink worked fine
                _this.products = data;
                _this.noResultsFound = false;
            }
            else {
                _this.products = undefined;
                _this.noResultsFound = true;
            }
        }).catch(function (err) {
            console.error(err);
        });
    };
    SearchComponent.prototype.addProductToShoppingCart = function (p) {
        console.log("wuhu");
        console.log("ordered Amount: " + p.orderdAmount);
        console.log("available Amount: " + p.amountavailable);
        var user = this.webshopService.getUsername();
        if (!user) {
            window.alert("Sorry, but you need to be logged in to order something.");
            return;
        }
        if (isNaN(p.orderdAmount) || (p.orderdAmount < 0)) {
            window.alert("Sorry, but " + p.amountavailable + " isn't a valid amount to order. Please fix that and try again.");
            return;
        }
        if (p.orderdAmount > p.amountavailable) {
            console.log("Not enough pieces available.");
            window.alert("Sorry, but we only have " + p.amountavailable + " pieces of " + p.name + ". Please update your wanted amount of product " + p.name + " and try it again.");
            return;
        }
        this.webshopService.postCartItem(p).then(function (data) {
            if (data) {
                // seems like it worked fine
                window.alert("Added " + p.orderdAmount + " pieces of " + p.name + " to your shopping cart.");
            }
        }).catch(function (err) {
            console.error(err);
            window.alert("Sorry, but something went wrong. Please try again.");
        });
    };
    SearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-search',
            template: __webpack_require__("../../../../../src/app/search/search.component.html"),
            styles: [__webpack_require__("../../../../../src/app/search/search.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__webshop_service__["a" /* WebshopService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]])
    ], SearchComponent);
    return SearchComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shoppingcart/shoppingcart.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shoppingcart/shoppingcart.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\" *ngIf=\"cart\">\n    <p>\n        Der derzeitige Einkaufswagen\n\n        <br *ngIf=\"errorMessage\"/>\n        <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"errorMessage\">{{errorMessage}}\n          <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"errorMessage = ''\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <br *ngIf=\"successMessage\"/>\n        <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\" *ngIf=\"successMessage\">{{successMessage}}\n          <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"successMessage = ''\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n\n        <div *ngFor=\"let cartItem of cart; index as i\">\n            <button type=\"button\" name={{cartItem.pk_cartid}}\n            class=\"list-group-item list-group-item-action\"\n            (click)=\"cartItem.showDetails = !cartItem.showDetails\">\n\n                {{cartItem.productName}}\n            </button>\n           <form *ngIf=\"cartItem.showDetails\">\n                <br/>\n\n                <p>\n                <div class=\"form-group\">\n                <label><b>Preis: </b></label>\n                {{cartItem.price}}\n                </div>\n\n\n                <p>\n                <div class=\"form-group\">\n                <label><b>Menge</b></label>\n                <input type=\"text\" class=\"form-control\" name=\"amount\" [(ngModel)]=\"cartItem.amount\">\n                </div>\n\n\n                <button type=\"button\" class=\"btn btn-sm btn-outline-success\" (click)=\"saveChanges(i)\">Save Changes\n                  <span><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i></span>\n                </button>\n                <button type=\"button\" class=\"btn btn-sm btn-outline-danger\" (click)=\"deleteItem(i)\">Remove Item\n                  <span><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></span>\n                </button>\n            </form>\n            <br/>\n        </div>\n\n        <form *ngIf=\"cart.length > 0\">\n          <br/>\n            <button type=\"button\" class=\"btn btn-lg btn-success\" (click)=\"process()\">Send Order\n              <span><i class=\"fa fa-shopping-cart \" aria-hidden=\"true\"></i></span>\n            </button>\n        </form>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/shoppingcart/shoppingcart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingcartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webshop_service__ = __webpack_require__("../../../../../src/app/webshop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShoppingcartComponent = /** @class */ (function () {
    function ShoppingcartComponent(webshopService, router) {
        this.webshopService = webshopService;
        this.router = router;
        this.errorMessage = undefined;
        this.successMessage = undefined;
    }
    ShoppingcartComponent.prototype.ngOnInit = function () {
        this.getShoppingCart();
    };
    ShoppingcartComponent.prototype.getShoppingCart = function () {
        var _this = this;
        //the created cart items
        this.webshopService.
            getCart().then(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
            _this.cart = data;
            _this.totalCosts = 0;
            //go through all elements and find out their name
            _this.webshopService.getProducts().then(function (data) {
                var prod = data;
                var i = 0;
                for (; i < _this.cart.length; i++) {
                    //Search for the product of this item
                    var a = 0;
                    var name_1 = void 0;
                    for (; a < prod.length && name_1 === undefined; a++) {
                        if (prod[a].pk_productid == _this.cart[i].fk_pk_productid) {
                            name_1 = prod[a].name;
                        }
                    }
                    _this.cart[i].productName = name_1;
                    _this.totalCosts += _this.cart[i].amount * _this.cart[i].price;
                }
            });
        }).catch(function (err) {
            console.error(err);
            _this.router.navigate(['/home']);
        });
    };
    ShoppingcartComponent.prototype.saveChanges = function (p) {
        var _this = this;
        this.webshopService.putCartItem(this.cart[p]).then(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
            if (data) {
                // seems like it worked
                _this.successMessage = "Successfully updated your shoppingCart.";
                // this.user = undefined;
                return;
            }
            else {
                // should not happen...
                _this.errorMessage = "We are sorry, but an error occured. Please try again later.";
            }
        }).catch(function (err) {
            console.error(err);
            _this.errorMessage = "";
            _this.errorMessage.concat("We are sorry, but an error occurred: ", err);
        });
    };
    ShoppingcartComponent.prototype.deleteItem = function (p) {
        var _this = this;
        this.webshopService.deleteCartItem(this.cart[p])
            .then(function (data) {
            console.log("data: " + JSON.stringify(data, null, 2));
            if (data) {
                // seems like it worked
                _this.successMessage = "Successfully removed this item.";
                //in case of reloading
                //window.location.reload(false);
            }
        }).catch(function (err) {
            console.error(err);
            _this.errorMessage = "Element not removed. This may be because of a server error.";
        });
    };
    /**
     * Converts all shoppingCartItems to orderItems and this shoppingCart to an order
     */
    ShoppingcartComponent.prototype.process = function () {
        console.log(this.totalCosts);
        var order = { "pk_orderid": 0, "orderdate": (new Date()) + "", "price": this.totalCosts, "deliverydate": null,
            "paymentstate": "open", "paymentmethod": null };
        order.items = new Array(this.cart.length);
        for (var i = 0; i < this.cart.length; i++) {
            order.items[i] = { "pk_fk_itemid": 0, "price": this.cart[i].price, "amount": this.cart[i].amount,
                "fk_productid": this.cart[i].fk_pk_productid };
            this.webshopService.deleteCartItem(this.cart[i]);
        }
        this.webshopService.postOrder(order);
        //this.router.navigate(['/dodo']);
    };
    ShoppingcartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-shoppingcart',
            template: __webpack_require__("../../../../../src/app/shoppingcart/shoppingcart.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shoppingcart/shoppingcart.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__webshop_service__["a" /* WebshopService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]])
    ], ShoppingcartComponent);
    return ShoppingcartComponent;
}());



/***/ }),

/***/ "../../../../../src/app/webshop.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebshopService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WebshopService = /** @class */ (function () {
    function WebshopService(http) {
        this.http = http;
    }
    WebshopService.prototype.configureEndpoint = function (url) {
        this.url = url;
    };
    WebshopService.prototype.configureUser = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.username = username;
            _this.password = password;
            var users = [];
            _this.getUsers(username).then(function (data) {
                users = data;
                console.log("data: " + JSON.stringify(data, null, 2));
                if (users.length == 1) {
                    // user login successful
                    _this.isAdmin = users[0].isadmin;
                    return resolve(users[0].name + " " + users[0].surname);
                }
                else {
                    return reject("fail");
                }
            }).catch(function (err) {
                console.error(err);
                return reject("fail");
            });
        });
    };
    WebshopService.prototype.getUsername = function () {
        return this.username;
    };
    WebshopService.prototype.getUserIsAdmin = function () {
        return this.isAdmin;
    };
    // get Users (by Username?)
    WebshopService.prototype.getUsers = function (username) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        params = params.append('limit', "100");
        if (username) {
            params = params.append('username', username);
        }
        return this.http.get(this.url + "/rest/users", {
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            // console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    // put User by Username
    WebshopService.prototype.putUser = function (user) {
        if ("PW" == user.pwhash) {
            user.pwhash = this.password;
        }
        console.log("put User: " + JSON.stringify(user, null, 2));
        console.log("username: " + this.username);
        console.log("password: " + this.password);
        // let body = user;
        // // let params = new HttpParams();
        // // params = params.append('body', JSON.stringify(user));
        return this.http.put(this.url + "/rest/users/" + user.pk_username, user, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    // delete User
    WebshopService.prototype.deleteUser = function (user) {
        if (!user) {
            user = { pk_username: this.username };
        }
        return this.http.delete(this.url + "/rest/users/" + user.pk_username, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    // register user
    WebshopService.prototype.postRegistration = function (user) {
        // console.log("put User: " + JSON.stringify(user, null, 2));
        return this.http.post(this.url + "/rest/register", user, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    // get Products
    WebshopService.prototype.getProducts = function (groupid, keyword) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        params = params.append('limit', "100");
        if (groupid) {
            params = params.append('groupid', groupid.toString());
        }
        if (keyword) {
            params = params.append('keyword', keyword);
        }
        return this.http.get(this.url + "/rest/products", {
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            // console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    // get Orders
    WebshopService.prototype.getOrders = function () {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        params = params.append('limit', "100");
        return this.http.get(this.url + "/rest/orders", {
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            // console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    // get Orders
    WebshopService.prototype.getOrdersByUsername = function (username) {
        // console.log("-----------------------------------------------");
        if (!username) {
            username = this.username;
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        params = params.append('limit', "100");
        return this.http.get(this.url + "/rest/orders/user/" + username, {
            params: params,
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            // console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    // get Productgroups
    WebshopService.prototype.getProductGroups = function () {
        return this.http.get(this.url + "/rest/groups", {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            // console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    WebshopService.prototype.getCart = function () {
        return this.http.get(this.url + "/rest/cart", {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            return response;
        })
            .catch(this.handleError);
    };
    // put User by Username
    WebshopService.prototype.putProduct = function (p) {
        return this.http.put(this.url + "/rest/products/" + p.pk_productid, p, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    WebshopService.prototype.deleteProduct = function (p) {
        return this.http.delete(this.url + "/rest/products/" + p.pk_productid, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    WebshopService.prototype.postProduct = function (p) {
        return this.http.post(this.url + "/rest/products", p, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    // postCartItem(amount:number, price:number, username:string, prodID):Promise<types.CartItems[]>{
    //
    //   let targ : string = '{"amount":' + amount + ', "price":' + price + ', "fk_pk_username":"' + username + '", "fk_pk_productid":'
    //             +prodID + '}';
    //   console.log("Posting: "+ targ);
    //   return this.http.post(`${this.url}/rest/cart`, targ,{
    //     headers:new HttpHeaders().set('Authorization', 'Basic ' + btoa(`${this.username}:${this.password}`))
    //   })
    //   .toPromise()
    //   .then((response)=>{
    //     console.log(response);
    //     return response
    //   })
    //   .catch(this.handleError);
    // }
    WebshopService.prototype.postCartItem = function (p) {
        var item = { amount: p.orderdAmount, price: p.price, fk_pk_username: this.username, fk_pk_productid: p.pk_productid };
        return this.http.post(this.url + "/rest/cart", item, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    WebshopService.prototype.putCartItem = function (p) {
        console.log("send: " + p);
        return this.http.put(this.url + "/rest/cart/" + p.pk_cartid, p, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    WebshopService.prototype.deleteCartItem = function (p) {
        return this.http.delete(this.url + "/rest/cart/" + p.pk_cartid, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    WebshopService.prototype.putOrder = function (p) {
        console.log(JSON.stringify(p));
        return this.http.put(this.url + "/rest/cart/" + p.pk_orderid, p, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    WebshopService.prototype.deleteOrder = function (p) {
        return this.http.delete(this.url + "/rest/orders/" + p.pk_orderid, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    // register user
    WebshopService.prototype.postOrder = function (order) {
        console.log("post order: " + JSON.stringify(order, null, 2));
        return this.http.post(this.url + "/rest/orders", order, {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'Basic ' + btoa(this.username + ":" + this.password))
        })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(this.handleError);
    };
    WebshopService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    WebshopService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], WebshopService);
    return WebshopService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./mt": "../../../../moment/locale/mt.js",
	"./mt.js": "../../../../moment/locale/mt.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map