import { Component, OnInit } from '@angular/core';
import Commerce from '@chec/commerce.js';
import { Product } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  
  private commerce
  public products: Product [] = []
  public cart
  
  constructor() { }

  ngOnInit(): void {
    this.commerce = new Commerce(environment.commerceKey);
    this.commerce.cart
    .retrieve()
    .then((cart) => {
      console.log(cart)
      this.cart = cart
    });

    this.commerce.cart.contents().then((items) => {
      console.log(items)
      for (let i = 0; i < items.length; i++) {
        let product: Product = {
          id: items[i].id,
          name: items[i].name,
          description: '',
          price: items[i].line_total.formatted_with_symbol,
          imageUrl: items[i].image.url
        }
        this.products.push(product)
      }
    });
  }

}
