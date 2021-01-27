import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Account } from '../models/account.interface';
import { environment } from 'src/environments/environment';
import { AuthData } from '../models/auth-date.interface';
import { Order } from '../models/order.model';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private isAdmin = false;
  private adminStatusListener = new Subject<boolean>();

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAdminStatusListener() {
    return this.adminStatusListener.asObservable();
  }

  // TODO add api call
  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  me() {
    return this.httpClient.get<{success: boolean, message: string, user: any, orders: any}>(BACKEND_URL + 'me').pipe(map(response => {
      return {user: response.user, orders: response.orders.map(order => {
        return new Order(
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
      })};
    }));
  }

  createUser(customer: Account) {
    const customerToSend: any = customer;
    this.httpClient.post(BACKEND_URL + 'signup', customerToSend)
      .subscribe(response => {
        if(response['success'] === true) {
          Swal.fire({
            icon: 'success',
            title: 'Account Created',
            text: 'Your account has been created successfully',
          });
        }
      });
    this.router.navigateByUrl('account/login');
  }

  checkIfAdmin() {
    return this.httpClient.get<any>(
      BACKEND_URL + 'check-admin'
    ).subscribe(response => {
      const isAdmin = response.admin;
      this.isAdmin = isAdmin;
      if (isAdmin) {
        const expiresInDuration = 25000;
        this.setAuthTimer(expiresInDuration);
        this.isAdmin = true;
        this.adminStatusListener.next(true);
        const now = new Date();
        const expirationData = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAdminData(isAdmin, expirationData);
      } else {
        this.isAdmin = false;
        localStorage.setItem('isAdmin', isAdmin);
        this.adminStatusListener.next(false);
      }
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.httpClient.post<{token: string, expiresIn: number}>(BACKEND_URL + 'login', authData)
    .subscribe(async response => {
      const token = response.token;
      this.token = token;
      if (token) {
        this.checkIfAdmin();
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationData = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationData);
        this.router.navigate(['/account']);
      }
    });
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.checkIfAdmin();
    }
  }


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.authStatusListener.next(false);
    this.adminStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigateByUrl('/account/login');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private saveAdminData(isAdmin: string, expirationDate: Date) {
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('adminExpiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminExpiration')
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private getAdminData() {
    const isAdmin = localStorage.getItem("isAdmin");
    const adminExpirationData = localStorage.getItem("adminExpiration")
    if(!isAdmin || !adminExpirationData) {
      return;
    }
    return {
      isAdmin: isAdmin,
      expirationData: new Date(adminExpirationData)
    }
  }

  upgradeToAdmin(key: string) {
    return this.httpClient.post<any>(
      BACKEND_URL + 'upgrade-to-admin', {key})
  }
}
