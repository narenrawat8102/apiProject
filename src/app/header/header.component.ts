import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../apiServices/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  dataTitle = this.dataService.fetchDataTitle();
  fetching: boolean = false;

  editMode: boolean = false;
  editIndex!: number;

  @ViewChild('id') id!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('price') price!: ElementRef;

  products: any = [
    // { id: 'p1', name: 'Laptop', price: 45000 },
    // { id: 'p2', name: 'Mobile', price: 55000 },
    // { id: 'p3', name: 'Television', price: 15000 },
    // { id: 'p4', name: 'Washing Machine', price: 10000 },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.onFetchProduct();
  }

  // Method to Add Products
  onAddProduct(id: any, name: any, price: any) {
    if (this.editMode) {
      this.products[this.editIndex] = {
        id: id.value,
        name: name.value,
        price: price.value,
      };
      this.editMode = false;
      this.id.nativeElement.value = '';
      this.name.nativeElement.value = '';
      this.price.nativeElement.value = '';
    } else {
      this.products.push({
        id: id.value,
        name: name.value,
        price: price.value,
      });
    }
    this.onSaveProduct();
  }

  // Method to Save Products
  onSaveProduct() {
    this.dataService.saveProducts(this.products).subscribe(
      (response) => console.log(response),
      (err) => console.log(err)
    );
  }

  // Method to Fetch Products
  onFetchProduct() {
    this.fetching = true;
    this.dataService.fetchProducts().subscribe(
      (response) => {
        console.log(response);
        this.products = response;
        this.fetching = false;
      },
      (err) => console.log(err)
    );
  }

  // Method to Delete Products
  onDeleteProduct(index: number) {
    if (confirm('Do you want to delete this product?')) {
      this.products.splice(index, 1);
      this.onSaveProduct();
    }
  }

  // Method to Edit Products
  onEditProduct(index: number) {
    this.editMode = true;
    this.editIndex = index;
    // console.log(this.products[index]);
    this.id.nativeElement.value = this.products[index].id;
    this.name.nativeElement.value = this.products[index].name;
    this.price.nativeElement.value = this.products[index].price;
  }
}
