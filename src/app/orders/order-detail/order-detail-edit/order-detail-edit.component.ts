import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail-edit',
  templateUrl: './order-detail-edit.component.html',
  styleUrls: ['./order-detail-edit.component.css']
})
export class OrderDetailEditComponent implements OnInit {
  order: Order;
  isAdmin: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.getIsAdmin()) {
      this.isAdmin = true;
    }
    this.route.params.subscribe(params => {
      if (params.id) {
        this.orderService.getOrderById(params.id).subscribe(response => {
          this.order = response.order;
        });
      }
    });
  }

  changePaid(): void {
    this.orderService.togglePaid(this.order._id).subscribe(response => {
      if (response.success) {
        this.order.paid = !this.order.paid;
      }
    });
  }

  changeDelivered(): void {
    this.orderService.toggleDelivered(this.order._id).subscribe(response => {
      if (response.success) {
        this.order.delivered = !this.order.delivered;
      }
    });
  }
}
