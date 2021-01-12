import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

type Cart = {product: Product, quantity: number};

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cart: Cart[] = [];
  public cartChanged = new Subject<Cart[]>();

  constructor() { }

  public addItemToCart(product: Product, quantity: number = 1) {
    const productIndex = this.cart.findIndex(p => p.product.getId() === product.getId());
    if (productIndex >= 0) {
      this.cart[productIndex].quantity += quantity;
    } else {
      this.cart.push({product, quantity});
    }
    this.cartChanged.next([...this.cart]);
  }

  // TODO function for remove and clear
}
