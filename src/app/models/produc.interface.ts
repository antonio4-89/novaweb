export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: 'comida' | 'bebida' | 'postre';
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
  }