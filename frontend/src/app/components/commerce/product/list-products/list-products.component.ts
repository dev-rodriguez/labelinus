import { Component, OnInit , Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  public products: Product[] = []
  constructor(private commerceService: CommerceService) { }

  ngOnInit(): void {
    this.commerceService.listProducts()
    .subscribe((response: any) => {
      console.log(response)
      for (let i = 0; i < response.data.length; i++) {
        let product: Product = {
          name: '',
          description: '',
          price: '',
          imageUrl: ''
        }
        product.name = response.data[i].name
        product.description = response.data[i].description
        product.price = response.data[i].price.formatted_with_symbol
        product.imageUrl = response.data[i].image.url
        this.products.push(product)
      }
    })
  }

}
