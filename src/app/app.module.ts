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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { AuthService } from './services/auth.service';
import { AccountSignupComponent } from './account/account-signup/account-signup.component';
import { CountryPickerComponent } from './account/country-picker/country-picker.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
    AccountLoginComponent,
    AccountSignupComponent,
    CountryPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, ProductService, ShoppingCartService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
