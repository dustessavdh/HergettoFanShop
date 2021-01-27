import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]),
    imageUrl: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const product = new Product(
        1,
        this.productForm.value.title,
        this.productForm.value.description,
        this.productForm.value.price,
        this.productForm.value.imageUrl,
        [],
        []);
      this.productService.addProduct(product);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Form is not valid',
        text: 'It looks like 1 or more fields are not valid',
      });
    }
  }
}
