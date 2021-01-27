import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + '/products/';
@Injectable({
  providedIn: 'root'
})
// export class ProductService extends HttpService {
export class ProductService {

  private products: Product[] = [];
  public productsChanged = new Subject<Product[]>();

  // constructor(http: HttpClient) {
  //   super(http);
  // }
  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  public getProducts() {
    return this.httpClient.get<{message: string, products: any[]}>(BACKEND_URL).pipe(map(productData => {
      return productData.products.map(product => {
        return new Product(
          product.id,
          product.title,
          product.description,
          product.price,
          product.imageUrl,
          product.sizes,
          product.colors,
          product._id
        );
      });
    })).subscribe((products: Product[]) => {
      this.products = products;
      this.productsChanged.next([...products]);
    });
  }

  public getProduct(id: string): Observable<Product> {
    return this.httpClient.get<{message: string, product: any}>(BACKEND_URL + id).pipe(map(productData => {
      return productData.product = new Product(
        productData.product.id,
        productData.product.title,
        productData.product.description,
        productData.product.price,
        productData.product.imageUrl,
        productData.product.sizes,
        productData.product.colors,
        productData.product._id
      );
    }));
  }

  addProduct(product: Product) {
    this.httpClient.post<{message: string; productId: string}>(BACKEND_URL, product).subscribe(responseData => {
        const id = responseData.productId;
        product.id = id;
        this.products.push(product);
        this.productsChanged.next([...this.products]);
        this.router.navigateByUrl('/products/' + id);
      });
  }

  // public updateProduct(productId: number, product: Product) {
  //   return this.http.put(`${this.host}/products/${productId}`, product);
  // }

  // public deleteProduct(productId: number) {
  //   return this.http.delete(`${this.host}/products/${productId}`);
  // }
}
