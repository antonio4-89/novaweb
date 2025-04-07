import { Component } from '@angular/core';
import { Product } from '../../models/produc.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'all';
  searchTerm: string = '';

  constructor(private productService: ProductosService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filterProducts();
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                           product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  onCategoryChange(category: any): void {
    this.selectedCategory = category.target.value;
    this.filterProducts();
  }

  onSearchChange(searchTerm: any): void {
    
    this.searchTerm = searchTerm.target.value;
    this.filterProducts();
  }

  onProductCreated(): void {
    this.loadProducts();
  }

  onProductDeleted(): void {
    this.loadProducts();
  }
}
