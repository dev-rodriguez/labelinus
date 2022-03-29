import { Component, OnInit , Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import Commerce from '@chec/commerce.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  public products: Product[] = []
  public spinner = true
  private commerce

  constructor() { }

  ngOnInit(): void {
    this.commerce = new Commerce(environment.commerceKey);
    this.listProducts()
  }

  listProducts() {
    this.commerce.products.list().then((elements) => {
      console.log(elements)
      for (let i = 0; i < elements.data.length; i++) {
        let product: Product = {
          id: elements.data[i].id,
          name: elements.data[i].name,
          description: elements.data[i].description,
          price: elements.data[i].price.formatted_with_symbol,
          imageUrl: elements.data[i].image.url
        }
        this.products.push(product)
      }
      this.spinner = false
    })
  }
}
