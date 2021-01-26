import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-account-order-item',
  templateUrl: './account-order-item.component.html',
  styleUrls: ['./account-order-item.component.css']
})
export class AccountOrderItemComponent implements OnInit {
  @Input() order: Order;
  @Input() isAdmin: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
