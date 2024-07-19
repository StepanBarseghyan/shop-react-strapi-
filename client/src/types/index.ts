export interface CartProduct {
  id: number;
  title: string;
  imgUrl: string;
  price: number;
  discountedPrice: number;
  quantity: number;
}

export interface Product {
  id: number;
  title: string;
  imgUrl: string;
  price: number;
  discountedPrice: number;
}

export interface DataType {
  products: Product[];
  meta: any;
}
