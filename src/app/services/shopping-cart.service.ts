import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cart: Cart[] = [];
  public cartChanged = new Subject<Cart[]>();

  constructor() { }

  public getItemsInCart(): Cart[] {
    return [...this.cart];
  }

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
