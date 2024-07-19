import React, { useState, useEffect } from "react";
import { AutoComplete } from "antd";
import styles from "./styles.module.css";
import { SearchOutlined } from "@ant-design/icons";
import {
  useLazyGetProductsQuery,
  useLazyGetProductsTitlesQuery,
} from "../../store/api/productsApi";
import useDebounce from "../../hooks/useDebounce";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [fetchProducts] = useLazyGetProductsQuery();
  const [fetchProductTitles, { data: productTitles }] =
    useLazyGetProductsTitlesQuery();
  const debouncedInputValue = useDebounce(inputValue, 500);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (debouncedInputValue) {
      fetchProductTitles(debouncedInputValue);
    } else {
      fetchProductTitles("");
    }
  }, [debouncedInputValue, fetchProductTitles]);

  const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      fetchProducts((e.target as HTMLInputElement).value);
    }
  };

  const handleSelect = (value: string) => {
    fetchProducts(value);
  };

  return (
    <AutoComplete
      placeholder="Search products"
      onSearch={handleInputChange}
      onKeyDown={handleKeyPress}
      onSelect={handleSelect}
      className={styles.search}
      size="large"
      suffixIcon={<SearchOutlined />}
      options={productTitles?.map((product) => ({ value: product.title }))}
    />
  );
};

export default SearchBar;
