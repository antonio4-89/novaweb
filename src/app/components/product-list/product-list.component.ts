import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/produc.interface';
import { ProductosService } from '../../services/productos.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  standalone: false
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Output() delete = new EventEmitter<void>();

  constructor(
    private productService: ProductosService,
    private categoryService: CategoriaService,
  ) {}

  getCategoryLabel(categoryValue: string): string {
    return this.categoryService.getCategoryLabel(categoryValue);
  }

  onDeleteProduct(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(success => {
        if (success) {
          this.delete.emit();
        }
      });
    }
  }
}