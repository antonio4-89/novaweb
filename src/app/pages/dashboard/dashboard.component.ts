import { Component } from '@angular/core';
import { Product } from '../../models/produc.interface';
import { ProductosService } from '../../services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  products: Product[] = [];
  
  currentTap = 0;
  categories: any[] = [];
  swiperReady = false;

  taps = [
    { tapTitle: "Antojitos" }, 
    { tapTitle: "Aguas" }, 
    { tapTitle: "Postres" }
  ];

  productos = [
    { id: 1, image: "assets/image/flan.png", nombre: "Flan de leche", precio: "140" },
    { id: 2, image: "assets/image/platanos.png", nombre: "Plátanos", precio: "40" },
    { id: 3, image: "assets/image/esquite.png", nombre: "Esquite", precio: "80" },
    { id: 4, image: "assets/image/pastel.png", nombre: "Pastel", precio: "100" },
    { id: 5, image: "assets/image/flan.png", nombre: "Flan napolitano", precio: "140" },
    { id: 6, image: "assets/image/totopo.webp", nombre: "Totopos", precio: "190" },
  ];

  snacks = [
    { id: 6,image: "assets/image/papas.png", nombre: "Papas", precio: "20" }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.categories = [this.productos, this.snacks, this.productos];
  }

  async ir() {
    await this.router.navigate(['/ingredientes'], {
      state: { product: this.productos[0] } 
    });
  }


  goToTap(item:number){
    this.currentTap = item
  }

  onSwiperReady() {
    this.swiperReady = true;
  }
}