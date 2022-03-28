import { Component, OnInit } from '@angular/core';
import Commerce from '@chec/commerce.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {
  
  public cartId: String
  public cartBadgeCounter = 0
  private commerce
  constructor() { }

  ngOnInit(): void {
    this.commerce = new Commerce(environment.commerceKey);
    this.commerce.cart
    .retrieve()
    .then((cart) => {
      this.cartBadgeCounter = cart.total_items
    });
  }

}
