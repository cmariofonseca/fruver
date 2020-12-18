import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Product {
  amount: number;
  category?: string;
  description?: string;
  id_product: number;
  measure?: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  productForm: FormGroup;
  productName = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  products: Product[] = [];
  isUpdate = false;
  id: number;
  productColumns: string[] = ['id_product', 'name', 'price', 'amount', 'actions'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    this.http.get<Product[]>('/api/products').subscribe(response => {
      console.log(response);
      this.products = response;
    });
  }

  createProduct(): void {
    if (this.isUpdate) {
      const updatedProduct = {
        amount: this.amount.value,
        name: this.productName.value,
        price: this.price.value
      };
      this.http.put(`/api/product/${this.id}`, updatedProduct).subscribe(
        response => {
          console.log(response);
          this.getAllProducts();
          this.amount.reset();
          this.productName.reset();
          this.price.reset();
        }, error => {
          console.log(error);
        }
      );
    } else {
      const newProduct = {
        amount: this.amount.value,
        name: this.productName.value,
        price: this.price.value
      };
      this.http.post(`/api/product`, newProduct).subscribe(
        response => {
          console.log(response);
          this.getAllProducts();
          this.amount.reset();
          this.productName.reset();
          this.price.reset();
        }, error => {
          console.log(error);
        }
      );
    }
    this.isUpdate = false;
  }

  deleteProduct(idProduct: number): void {
    this.http.delete(`/api/product/${idProduct}`).subscribe(
      response => {
        console.log(response);
        this.getAllProducts();
      }, error => {
        console.log(error);
      }
    );
  }

  updateProduct(product: Product): void {
    this.id = product.id_product;
    this.isUpdate = true;
    this.amount.setValue(product.amount),
    this.productName.setValue(product.name);
    this.price.setValue(product.price);
  }

}
