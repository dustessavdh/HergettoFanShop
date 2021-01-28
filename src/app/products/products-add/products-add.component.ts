import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  editProduct: boolean = false;
  productId: string = '';

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editProduct = true;
        this.productService.getProduct(params.id).subscribe(product => {
          this.productId = product.getId();
          this.productForm.setValue({
            title: product.getTitle(),
            description: product.getDescription(),
            price: product.getPrice(),
            imageUrl: product.getImageUrl()});
        });
      }
    });
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
      if (!this.editProduct) {
        this.productService.addProduct(product);
      } else {
        product.setId(this.productId);
        this.productService.updateProduct(product);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Form is not valid',
        text: 'It looks like 1 or more fields are not valid',
      });
    }
  }

  deleteProduct(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you?',
      text: 'Are you sure you want to delete this product?',
      showCancelButton: true,
      cancelButtonText: 'No',
      showConfirmButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(this.productId);
        this.router.navigateByUrl('/products');
      }
    });
  }
}
