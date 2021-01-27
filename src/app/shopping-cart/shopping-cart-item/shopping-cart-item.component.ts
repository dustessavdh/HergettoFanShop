import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() cartItem: Cart;
  @Output() cartItemDeleted: EventEmitter<Cart> = new EventEmitter<Cart>();
  @Output() quantityChanged: EventEmitter<Cart> = new EventEmitter<Cart>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteCartItem(): boolean {
    let success = false;
    Swal.fire({
      title: 'Are you sure you want to remove this item from the shopping cart?',
      text: `By doing this you will remove '${this.cartItem.product.getTitle()}' from the shopping cart`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.cartItemDeleted.emit(this.cartItem);
        success = true;
      }
    });
    return success;
  }

  changeQuantity(numberToChange: number): void {
    this.cartItem.amount += numberToChange;
    if (this.cartItem.amount < 1) {
      if (!this.deleteCartItem()) { this.cartItem.amount += 1; }
    } else {
      this.quantityChanged.emit(this.cartItem);
    }
  }
}
