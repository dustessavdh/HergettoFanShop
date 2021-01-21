import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public cartChanged = new Subject<Cart[]>();

  constructor() { }

  public getItemsInCart(): Cart[] {
    const cart = this.getCartFromStorage();
    return [...cart];
  }

  public addItemToCart(product: Product, quantity: number = 1): void {
    const cart: Cart[] = this.getCartFromStorage();
    const productIndex = cart.findIndex(p => p.product.getProductId() === product.getProductId());
    if (productIndex !== -1) {
      cart[productIndex].amount += quantity;
    } else {
      cart.push({product, amount: quantity});
    }

    this.setCartInStorage(cart);
  }

  public setQuantityCart(product: Product, quantity: number): void {
    const cart: Cart[] = this.getCartFromStorage();
    const index = cart.findIndex(cartItem => cartItem.product.getProductId() === product.getProductId());
    if (index !== -1) {
      cart[index].amount = quantity;
      this.setCartInStorage(cart);
    } else {
      Swal.fire({
        title: 'Could not change the quantity of an item in the shopping cart',
        text: 'An error occurred while changing the quantity of an item in the shopping cart',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Probeer opnieuw'
      });
    }
  }

  public removeFromCart(item: Cart): void {
    let cart: Cart[] = this.getCartFromStorage();
    const index = cart.findIndex(cartItem => cartItem.product.getProductId() === item.product.getProductId());
    if (index !== -1) {
      cart.splice(index, 1);
      this.setCartInStorage(cart);
    } else {
      Swal.fire({
        title: 'Could not remove item from the shopping cart',
        text: 'An error occurred while removing an item from the shopping cart',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Probeer opnieuw'
      });
    }
  }

  private getCartFromStorage(): Cart[] {
    try {
      const rawCart = localStorage.getItem('shoppingCartItems');
      const cart = JSON.parse(<string>rawCart) as Cart[];
      cart.forEach((item: any) => {
        // tslint:disable-next-line: max-line-length
        item.product = new Product(item.product.productId, item.product.title, item.product.description, item.product.price, item.product.imageUrl, item.product.sizes, item.product.color, item.product.id);
      })
      if (!cart) {
        return [];
      }
      return cart;
    } catch (error) {
      return [];
    }
  }

  private setCartInStorage(cart: Cart[]): void {
    localStorage.setItem('shoppingCartItems', JSON.stringify(cart));
    this.cartChanged.next([...cart]);
  }
}
