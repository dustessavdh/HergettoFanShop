import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
// export class ProductService extends HttpService {
export class ProductService {

  private products: Product[] = [
    new Product(1, 'T-shirt met logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(2, 'Trui met logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(3, 'Broek met logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(4, 'Sokken met logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(5, 'Pet met logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(6, 'Tas met logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green'])
  ];
  public productsChanged = new Subject<Product[]>();

  // constructor(http: HttpClient) {
  //   super(http);
  // }
  constructor() {
  }

  public getProducts() {
    // return this.http.get(`/products`);
    return new Observable(observer => {
      observer.next([...this.products]);
    });
  }

  public getProduct(productId: number) {
    // return this.http.get(`/products/${productId}`);
    return new Observable(observer => {
      const product = this.products.find(p => p.getId() === productId);
      observer.next(product);
    })
  }

  // public createProduct(product: Product) {
  //   return this.http.post(`${this.host}/products`, product);
  // }

  // public updateProduct(productId: number, product: Product) {
  //   return this.http.put(`${this.host}/products/${productId}`, product);
  // }

  // public deleteProduct(productId: number) {
  //   return this.http.delete(`${this.host}/products/${productId}`);
  // }
}
