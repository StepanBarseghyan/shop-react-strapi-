import styles from "./styles.module.css";
import AppHeader from "../../components/Header";
import AppFooter from "../../components/Footer";
import { Product } from "../../types";
import ProductsList from "../../components/ProductList";
import { useGetProductsQuery } from "../../store/api/productsApi";
import { useAppSelector } from "../../store/hooks";
import { selectProducts } from "../../store/slices/products";

const Home = () => {
  const { isLoading } = useGetProductsQuery("");
  const productData = useAppSelector(selectProducts);
  console.log(productData);
  return (
    <main className={styles.main}>
      <AppHeader />
      <ProductsList data={productData} />
      <AppFooter />
    </main>
  );
};

export default Home;
