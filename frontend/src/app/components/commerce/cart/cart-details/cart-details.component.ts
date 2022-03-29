import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import Commerce from '@chec/commerce.js';
import {
  Item
} from 'src/app/interfaces/item';
import {
  Product
} from 'src/app/interfaces/product';
import {
  environment
} from 'src/environments/environment';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators
} from '@angular/forms';
import {
  ValidatorService
} from 'src/app/services/validators/validator.service';
import {
  states
} from 'src/app/interfaces/states';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  private commerce
  private checkoutId
  public spinner = true
  public items: Item[] = []
  public cart
  public states = states

  public shippingForm: FormGroup = this.fb.group({
    addressLine1: ['', [Validators.required]],
    addressLine2: [''],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
    shippingOption: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private validatorService: ValidatorService) {}

  ngOnInit(): void {
    this.commerce = new Commerce(environment.commerceKey);
    this.getCart()
    this.getIems()
  }

  getCart() {
    this.commerce.cart
      .retrieve()
      .then((cart) => {
        console.log(cart)
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

  dropItem(item: Item) {
    this.commerce.cart.remove(item.id).then((response) => {
      this.items = []
      this.spinner = true
      this.getCart()
      this.getIems()
    });
  }

  updateItemQuantity(item: Item, operation) {
    let quantity = item.quantity

    if (operation === '+') {
      quantity = quantity + 1
    }
    if (operation === '-') {
      quantity = quantity - 1
    }

    if (quantity > 0) {
      this.commerce.cart.update(item.id, {
          quantity: quantity
        })
        .then(response => {
          console.log(response)
          this.items = []
          this.spinner = true
          this.getCart()
          this.getIems()
        });
    } else {
      this.dropItem(item)
    }


  }

  notValidField(campo: string) {
    return (
      this.shippingForm.get(campo) ?.invalid &&
      this.shippingForm.get(campo) ?.touched
    );
  }
}
