import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  // private cart: Cart[] = [];
  public cartChanged = new Subject<Cart[]>();

  constructor() { }

  public getItemsInCart(): Cart[] {
    const cart = this.getCartFromStorage();
    return [...cart];
  }

  public addItemToCart(product: Product, quantity: number = 1) {
    const cart: Cart[] = this.getCartFromStorage();
    const productIndex = cart.findIndex(p => p.product.getId() === product.getId());
    if (productIndex !== -1) {
      cart[productIndex].quantity += quantity;
    } else {
      cart.push({product, quantity});
    }

    this.setCartInStorage(cart);
    this.cartChanged.next([...cart]);
  }

  private getCartFromStorage(): Cart[] {
    try {
      const rawCart = localStorage.getItem('shoppingCartItems');
      const cart = JSON.parse(<string>rawCart) as Cart[];
      cart.forEach((item: any) => {
        // tslint:disable-next-line: max-line-length
        item.product = new Product(item.product.id, item.product.title, item.product.description, item.product.price, item.product.imageUrl, item.product.sizes, item.product.color);
      })
      if (!cart) {
        return [];
      }
      return cart;
    } catch (error) {
      return [];
    }
  }

  private setCartInStorage(cart: Cart[]) {
    localStorage.setItem('shoppingCartItems', JSON.stringify(cart));
  }

  // TODO function for remove and clear
}
