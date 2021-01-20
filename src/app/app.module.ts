import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AccountComponent } from './account/account.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ShoppingCartItemComponent } from './shopping-cart/shopping-cart-item/shopping-cart-item.component';
import { AccountLoginComponent } from './account/account-login/account-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FrontPageComponent,
    ProductsComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    AccountComponent,
    ProductItemComponent,
    ShoppingCartItemComponent,
    AccountLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
