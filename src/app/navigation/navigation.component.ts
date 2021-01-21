import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  itemsInCart: number = 0;

  constructor(private cart: ShoppingCartService) { }

  ngOnInit(): void {
    this.itemsInCart = this.calculateItemsInCart(this.cart.getItemsInCart());
    this.cart.cartChanged.subscribe((cart: Cart[]) => {
      this.itemsInCart = this.calculateItemsInCart(cart);
    });
  }

  calculateItemsInCart(cart: Cart[]): number {
    let quantity = 0;
    cart.forEach((cart: Cart) => {
      quantity += cart.amount;
    });
    return quantity;
  }

}
