import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart.model';
import { Order } from '../models/order.interface';
import { Order as OrderM } from '../models/order.model';
import { Product } from '../models/product.model';

const BACKEND_URL = environment.apiUrl + '/order/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  orderChanged = new Subject<Order[]>();

  constructor(private httpClient: HttpClient) {}

  createOrder(order: any) {
    return this.httpClient.post(BACKEND_URL, {orderProducts: order})
  }

  getOrderById(orderId: string) {
    return this.httpClient.get<{order: any, user: any}>(BACKEND_URL + orderId).pipe(map(response => {
      return {user: response.user, order: new OrderM(
        response.order._id,
        response.order.createdAt,
        response.order.delivered,
        response.order.paid,
        response.order.userId,
        response.order.products.map(product => {
          return new Cart(
            new Product(
              1,
              product.title,
              product.description,
              product.price,
              product.imageUrl,
              product.sizes,
              product.colors,
              product._id
            ),
            product.amount
          );
        })
      )};
    }));
  }

  getOrders() {
    return this.httpClient.get<{message: string, orders: any[]}>(BACKEND_URL).pipe(map(response => {
      return response.orders.map(order => {
        return new OrderM(
          order._id,
          order.createdAt,
          order.delivered,
          order.paid,
          order.userId,
          order.products.map(product => {
            return new Cart(
              new Product(
                1,
                product.title,
                product.description,
                product.price,
                product.imageUrl,
                product.sizes,
                product.colors,
                product._id
              ),
              product.amount
            );
          })
        );
      });
    }));
  }

  getOrderUpdateListener() {
    return this.orderChanged.asObservable();
  }

  deleteOrder(orderId: string) {
    return this.httpClient.delete(BACKEND_URL + orderId);
  }

  togglePaid(orderId: string) {
    return this.httpClient.patch(BACKEND_URL + 'togglepaid/' + orderId, {})
  }

  toggleDelivered(orderId: string) {
    return this.httpClient.patch(BACKEND_URL + 'toggledelivery/' + orderId, {})
  }
}
