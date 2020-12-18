import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  priceKilo = 0;
  PriceProduct = 0;
  totalPrice = 0;
  products: any = [];
  weight = new FormControl('', Validators.required);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  // tslint:disable-next-line: typedef
  private getAllProducts() {
    this.http.get<any>('/api/products').subscribe(response => {
      this.products = response;
    });
  }

  // tslint:disable-next-line: typedef
  getWeight() {
    this.weight.reset();
    this.priceKilo = 0;
    this.PriceProduct = 0;
  }

  // tslint:disable-next-line: typedef
  addProduct(idProduct: number) {
    for (const product of this.products) {
      if (product.id_product === idProduct) {
        const value = product.price * 1.20;
        const weight = this.weight.value;
        const price = weight * (value / 1000);
        this.priceKilo = value;
        this.PriceProduct = price;
        this.totalPrice = this.totalPrice + price;
      }
    }
  }

}
