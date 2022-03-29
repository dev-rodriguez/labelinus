import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { HttpClientModule } from '@angular/common/http';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    IvyCarouselModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
