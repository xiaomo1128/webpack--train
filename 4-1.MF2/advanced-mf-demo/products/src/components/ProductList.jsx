import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { selectFilteredProducts, fetchProducts } from "../store/productsSlice";
import "./ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>加载商品中...</div>;
  }

  if (status === "failed") {
    return <div>加载失败: {error}</div>;
  }

  if (products.length === 0) {
    return <div>没有找到符合条件的商品</div>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
