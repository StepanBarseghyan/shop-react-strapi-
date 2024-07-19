import React from "react";
import ProductCard from "../ProductCard";
import styles from "./styles.module.css";
import { Product } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart, selectCartItems } from "../../store/slices/cart";

interface ProductsListProps {
  data: {
    products: Product[];
    meta: any;
  };
}

const ProductsList: React.FC<ProductsListProps> = ({ data }) => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  console.log({ cartItems });
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className={styles.product__list}>
      {data?.products?.map((product) => (
        <ProductCard
          product={product}
          onAddToCart={handleAddToCart}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default ProductsList;
