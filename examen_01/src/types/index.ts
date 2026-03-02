// Producto de FakeStore
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Usuario autenticado
export interface AuthUser {
  username: string;
  token: string;
}

// Item del carrito
export interface CartItem extends Product {
  quantity: number;
}