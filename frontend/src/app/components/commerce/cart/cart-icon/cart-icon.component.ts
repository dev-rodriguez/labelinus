import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {
  
  public cartId: String
  public cartBadgeCounter = 0
  constructor() { }

  ngOnInit(): void {
    this.cartId = sessionStorage.getItem('cartId')
    console.log(this.cartId)
  }

}
