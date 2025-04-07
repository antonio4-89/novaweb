import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categories = [
    { value: 'comida', label: 'Comida' },
    { value: 'bebida', label: 'Bebidas' },
    { value: 'postre', label: 'Postres' }
  ];

  getCategories() {
    return this.categories;
  }

  getCategoryLabel(value: string): string {
    const category = this.categories.find(c => c.value === value);
    return category ? category.label : '';
  }
}