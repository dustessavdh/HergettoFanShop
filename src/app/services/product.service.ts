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
    new Product(1, 'T-shirt with logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(2, 'Trui with logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(3, 'Broek with logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(4, 'Sokken with logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(5, 'Pet with logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(6, 'Tas with logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green'])
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
      if (product) {
        observer.next(product);
      } else {
        // tslint:disable-next-line: quotemark
        observer.error("Couldn't find product!")
      }
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
