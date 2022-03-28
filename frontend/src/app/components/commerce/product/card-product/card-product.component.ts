import { Component, OnInit, Input } from '@angular/core';

import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import Commerce from '@chec/commerce.js';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  @Input() productDetail: Product
  private cartId: String
  private commerce
  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.commerce = new Commerce(environment.commerceKey);
  }

  createCart() {
    this.cart.createCart()
    .subscribe((data: any) => {
      console.log('cart created', data)
      sessionStorage.setItem("cartId", data.id)
    })
  }

  async addProduct(product: Product, quantity = 1) {
    this.cartId = sessionStorage.getItem('cartId')
    console.log(product)
    this.commerce.cart.add(product.id, quantity)
    .then((response) => console.log(response));
  }

}
