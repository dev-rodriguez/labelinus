import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private commerceURL: string = environment.commerceURL + '/carts'
  private commerceKey: string = environment.commerceKey

  constructor(private http: HttpClient) { }

  createCart() {
    const options  = {
     headers: {
       "X-Authorization": this.commerceKey
     }
   }
   return this.http.get(this.commerceURL, options);
 }

 addProduct(cartId: String, product: Product, quantity) {
  const options  = {
    headers: {
      "X-Authorization": this.commerceKey,
      "Content-Type": "application/json"
    }
  }
  const body = {
    id: product.id,
    quantity: quantity
  }

  return this.http.post(this.commerceURL + '/' + cartId, body, options)

}


}
