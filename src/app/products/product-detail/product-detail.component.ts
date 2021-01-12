import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(private route: ActivatedRoute,
              private productsService: ProductService,
              private router: Router,
              private cart: ShoppingCartService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      // tslint:disable-next-line: radix
      this.productsService.getProduct(parseInt(params.id)).subscribe((product: Product) => {
        this.product = product;
      });
    });
  }

}
