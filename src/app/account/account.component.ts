import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
/**TODO:
 * make order toevoegen in shoppingcart
 * /order maken of gewoon dat is /account
 * simpele ui maken
 * error handling for verkeerde gegevens schrijven bij inloggen
 */
export class AccountComponent implements OnInit {
  orderSubscription: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderSubscription = this.orderService.getOrders().subscribe(orders => {
      console.log(orders);
    });
  }

}
