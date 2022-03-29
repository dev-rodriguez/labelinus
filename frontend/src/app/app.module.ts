import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListProductsComponent } from './components/commerce/product/list-products/list-products.component';
import { CardProductComponent } from './components/commerce/product/card-product/card-product.component';
import { ProductDetailsComponent } from './components/commerce/product/product-details/product-details.component';
import { CartIconComponent } from './components/commerce/cart/cart-icon/cart-icon.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { CartDetailsComponent } from './components/commerce/cart/cart-details/cart-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'premade-products', component: ListProductsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartDetailsComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    CardProductComponent,
    ProductDetailsComponent,
    CartIconComponent,
    ToolbarComponent,
    HomeComponent,
    CartDetailsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    IvyCarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
