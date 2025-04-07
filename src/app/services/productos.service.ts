import { Injectable } from '@angular/core';
import { Product } from '../models/produc.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private products: Product[] = [
    {
      id: '1',
      name: 'Tacos al pastor',
      description: 'Deliciosos tacos de cerdo marinado con especias',
      price: 15.99,
      category: 'comida',
      imageUrl: 'assets/images/tacos.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Agua de horchata',
      description: 'Refrescante bebida de arroz con canela',
      price: 8.50,
      category: 'bebida',
      imageUrl: 'assets/images/horchata.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(p => p.category === category);
    return of(filteredProducts);
  }

  addProduct(product: Product): Observable<Product> {
    const newProduct = {
      ...product,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.push(newProduct);
    this.productsSubject.next([...this.products]);
    return of(newProduct);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedProduct = {
        ...product,
        id,
        updatedAt: new Date()
      };
      this.products[index] = updatedProduct;
      this.productsSubject.next([...this.products]);
      return of(updatedProduct);
    }
    return of(product);
  }

  deleteProduct(id: string): Observable<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.productsSubject.next([...this.products]);
      return of(true);
    }
    return of(false);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}