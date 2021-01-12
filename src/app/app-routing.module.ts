import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { Product } from './models/product.model';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {path: '', component: FrontPageComponent},
  {path: 'products', children: [
    {path: '', component: ProductsComponent},
    {path: ':id', component: ProductDetailComponent}
  ]},
  {path: 'shoppingcart', component: ShoppingCartComponent},
  {path: 'account', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
