import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { Product } from '../../models/produc.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
  standalone: false
})
export class ProductFormComponent {

  @Output() productCreated = new EventEmitter<void>();
  @ViewChild('closeButton') closeButton: any;

  productForm!: FormGroup;
  categories: any[] = [];
  isEditing = false;
  currentProductId: any;
  showModal = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductosService,
    // private categoryService: CategoryService
  ) {
    // this.categories = this.categoryService.getCategories();
    this.initForm();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['']
    });
  }

  showForm(product?: Product): void {
    if (product) {
      this.isEditing = true;
      this.currentProductId = product.id;
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl
      });
    } else {
      this.isEditing = false;
      this.currentProductId = null;
      this.productForm.reset();
    }
    this.showModal = true;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      if (this.isEditing && this.currentProductId) {
        this.productService.updateProduct(this.currentProductId, productData).subscribe(() => {
          this.closeForm();
          this.productCreated.emit();
        });
      } else {
        this.productService.addProduct(productData).subscribe(() => {
          this.closeForm();
          this.productCreated.emit();
        });
      }
    }
  }

  closeForm(): void {
    this.showModal = false;
    this.productForm.reset();
  }
}