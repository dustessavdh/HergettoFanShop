import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  productsInCart: Cart[] = [];

  constructor(private cart: ShoppingCartService) { }

  ngOnInit(): void {
    this.productsInCart = this.cart.getItemsInCart();
    this.cart.cartChanged.subscribe((cart: Cart[]) => {
      this.productsInCart = cart;
    });
  }

  removeFromCart(item: Cart): void {
    this.cart.removeFromCart(item);
  }

  setQuantityCart(item: Cart): void {
    this.cart.setQuantityCart(item.product, item.amount);
  }

  clearCart(): void {

  }

  createOrder(): void {

  }

}
