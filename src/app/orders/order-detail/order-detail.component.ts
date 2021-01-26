import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.orderService.getOrderById(params.id).subscribe(response => {
          this.order = response.order;
          console.log(response);
        });
      }
    });
  }

}
