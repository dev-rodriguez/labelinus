import {
  Component,
  OnInit
} from '@angular/core';
import Commerce from '@chec/commerce.js';
import { Item } from 'src/app/interfaces/item';
import {
  Product
} from 'src/app/interfaces/product';
import {
  environment
} from 'src/environments/environment';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  private commerce
  public spinner = true
  public items: Item [] = []
  public cart


  constructor() {}

  ngOnInit(): void {
    this.commerce = new Commerce(environment.commerceKey);
    this.getCart()
    this.getIems()
  }

  getCart() {
    this.commerce.cart
      .retrieve()
      .then((cart) => {
        this.cart = cart
      });
  }

  getIems() {
    this.commerce.cart.contents().then((elements) => {
      for (let i = 0; i < elements.length; i++) {
        let product: Product = {
          id: elements[i].product_id,
          name: elements[i].name,
          description: '',
          price: elements[i].price.formatted_with_symbol,
          imageUrl: elements[i].image.url
        }
        let item: Item = {
          id: elements[i].id,
          product: product,
          quantity: elements[i].quantity,
          itemPrice: elements[i].line_total.formatted_with_symbol
        }
        this.items.push(item)
      }
      this.spinner = false
    });
  }

  dropItem (item: Item) {
    this.commerce.cart.remove(item.id).then((response) => {
      this.items = []
      this.spinner = true
      this.getCart()
      this.getIems()
    });
  }

}
