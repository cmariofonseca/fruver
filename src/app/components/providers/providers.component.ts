import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Provider {
  address: string;
  id_provider: number;
  name: string;
  telephone: number;
}

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})

export class ProvidersComponent implements OnInit {

  providerName =  new FormControl('', Validators.required);
  address =  new FormControl('', Validators.required);
  telephone =  new FormControl('', Validators.required);
  providers: Provider[] = [];
  isUpdate = false;
  id: number;
  providerColumns: string[] = ['id_provider', 'name', 'address', 'telephone', 'actions'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllProviders();
  }

  private getAllProviders(): void {
    this.http.get<Provider[]>('/api/providers').subscribe(response => {
      console.log(response);
      this.providers = response;
    });
  }

  createProvider(): void {
    if (this.isUpdate) {
      const updatedProvider = {
        address: this.address.value,
        name: this.providerName.value,
        telephone: this.telephone.value
      };
      this.http.put(`/api/provider/${this.id}`, updatedProvider).subscribe(
        response => {
          console.log(response);
          this.getAllProviders();
          this.address.reset();
          this.providerName.reset();
          this.telephone.reset();
        }, error => {
          console.log(error);
        }
      );
    } else {
      const newProduct = {
        address: this.address.value,
        name: this.providerName.value,
        telephone: this.telephone.value
      };
      this.http.post(`/api/provider`, newProduct).subscribe(
        response => {
          console.log(response);
          this.getAllProviders();
          this.address.reset();
          this.providerName.reset();
          this.telephone.reset();
        }, error => {
          console.log(error);
        }
      );
    }
    this.isUpdate = false;
  }

  deleteProvider(idProvider: number): void {
    this.http.delete(`/api/provider/${idProvider}`).subscribe(
      response => {
        console.log(response);
        this.getAllProviders();
      }, error => {
        console.log(error);
      }
    );
  }

  updateProvider(provider: Provider): void {
    this.id = provider.id_provider;
    this.isUpdate = true;
    this.address.setValue(provider.address),
    this.providerName.setValue(provider.name);
    this.telephone.setValue(provider.telephone);
  }

}
