import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-detail-item',
  templateUrl: './order-detail-item.component.html',
  styleUrls: ['./order-detail-item.component.css']
})
export class OrderDetailItemComponent implements OnInit {
  @Input() order: Order;
  totalPrice: number = 0;
  amountProducts: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.order) {
      this.amountProducts = this.order.products.length;
      this.totalPrice = this.calculateTotalPrice(this.order.products);
    }
  }

  private calculateTotalPrice(cart: Cart[]): number {
    let totalPrice: number = 0;
    cart.forEach(item => {
      totalPrice += item.product.getPrice() * item.amount;
    });

    return totalPrice;
  }
}
