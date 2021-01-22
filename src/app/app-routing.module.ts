import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AccountComponent } from './account/account.component';
import { AccountLoginComponent } from './account/account-login/account-login.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountSignupComponent } from './account/account-signup/account-signup.component';

const routes: Routes = [
  {path: '', component: FrontPageComponent},
  {path: 'products', children: [
    {path: '', component: ProductsComponent},
    {path: ':id', component: ProductDetailComponent}
  ]},
  {path: 'shoppingcart', component: ShoppingCartComponent},
  {path: 'account', children: [
    {path: '', canActivate: [AuthGuard], component: AccountComponent},
    {path: 'login', component: AccountLoginComponent},
    {path: 'signup', component: AccountSignupComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
