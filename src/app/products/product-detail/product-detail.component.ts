import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product: Product;
  productSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private productsService: ProductService,
              private router: Router,
              private cart: ShoppingCartService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      // tslint:disable-next-line: radix
      this.productSubscription = this.productsService.getProduct(params.id).subscribe((product: Product) => {
        this.product = product;
      }, err => {
        Swal.fire({
          toast: true,
          position: 'center',
          title: 'Something went wrong!',
          text: 'We could not find the product you were looking for!',
          icon: 'warning',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        }).then(result => {
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigateByUrl('products');
          }
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  addToCart(): void {
    this.cart.addItemToCart(this.product);
  }

}
