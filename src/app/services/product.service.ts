import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends HttpService {

  private products: Product[] = [
    new Product(1, 'T-shirt met logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(2, 'Trui met logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green']),
    new Product(3, 'broek met logo', 'super vet T-shirt en zo', 20.00, 'https://via.placeholder.com/150', ['XS', 'S', 'M', 'L', 'XL'], ['Red', 'Green'])
  ];
  public productsChanged = new Subject<Product[]>();

  constructor(http: HttpClient) {
    super(http);
  }

  public getProducts() {
    // return this.http.get(`${this.host}/products`);
    return [...this.products];
  }

  public getProduct(productId: number) {
    // return this.http.get(`${this.host}/products/${productId}`);
    return this.products.find(p => p.getId() === productId);
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
