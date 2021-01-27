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
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { AdminGuard } from './guards/admin.guard';
import { ProductsAddComponent } from './products/products-add/products-add.component';
import { OrderDetailEditComponent } from './orders/order-detail/order-detail-edit/order-detail-edit.component';

const routes: Routes = [
  {path: '', component: FrontPageComponent},
  {path: 'products', children: [
    {path: '', component: ProductsComponent},
    {path: 'add', canActivate: [AuthGuard, AdminGuard], component: ProductsAddComponent},
    {path: ':id', component: ProductDetailComponent}
  ]},
  {path: 'shoppingcart', component: ShoppingCartComponent},
  {path: 'account', children: [
    {path: '', canActivate: [AuthGuard], component: AccountComponent},
    {path: 'orders', canActivate: [AuthGuard], component: AccountComponent},
    {path: 'orders/:id', canActivate: [AuthGuard], component: OrderDetailComponent},
    {path: 'orders/:id/edit', canActivate: [AuthGuard, AdminGuard], component: OrderDetailEditComponent},
    {path: 'login', component: AccountLoginComponent},
    {path: 'signup', component: AccountSignupComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
