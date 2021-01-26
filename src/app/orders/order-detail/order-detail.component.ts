import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  totalPrice: number = 0;
  amountProducts: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.orderService.getOrderById(params.id).subscribe(response => {
          this.order = response.order;
          this.amountProducts = response.order.products.length;
          this.totalPrice = this.calculateTotalPrice(response.order.products);
          console.log(response);
        });
      }
    });
  }

  private calculateTotalPrice(cart: Cart[]): number {
    let totalPrice: number = 0;
    cart.forEach(item => {
      totalPrice += item.product.getPrice() * item.amount;
    });

    return totalPrice;
  }

}
