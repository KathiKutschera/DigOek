export interface Id {
  'id': number
  'error'?: string
}
export interface Count {
  'count': number
}

export interface User {
  pk_username: string,
  pwhash?: string,
  email: string,
  isadmin?: boolean
  name?: string,
  surname?: string,
  companyname?: string,
  billingaddress?: string,
  deliveryaddress?: string,
  vat?: string,
  nameoncc?: string,
  creditcardnr?: string,
  validyear?: number,
  validmonth?: number,
  ccv?: number
}


export interface Cart {

  items: CartItems[]
}

export interface CartItems {
  pk_cartID : number,
  amount : number,
  price : number,
  fk_pk_userName? : string,
  fk_pk_productID? : number
}

export interface Order {
  pk_orderid: number,
  orderdate?: string,
  deliverydate?: string,
  paymentstate?: string,
  paymentmethod?: string,
  price?: number,
  items? : OrderItem[];
  showDetails? : boolean
}

export interface OrderItem {
  pk_fk_itemID: number,
  price: number,
  amount: number,
  fk_pk_orderID? : number,
  fk_productID? : number
}

export interface Productgroup {
  pk_groupid: number,
  description?: string,
  name: string,
  iconclass: string
}

export interface Username {
  pk_username: string,
}

export interface Product {
  pk_productid: number,
  name: string,
  description: string,
  soldper: string,
  price: number,
  amountavailable: number,
  vatrate: number,
  imagename: string,
  orderdAmount: number
}

// used by express-basic-auth
export interface Auth {
  user: string,
  passwort: string
}

export interface UserDetails {
  surname: string,
  isAdmin: boolean
}
