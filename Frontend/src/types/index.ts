export interface Product {
  id: number; // Corrected type to number
  name: string;
  price: number;
  imageUrl?: string;
}

export interface CartItem extends Product {
    quantity: number
}

export type LikedProductIds = number[] // Corrected type to number[]