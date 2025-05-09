import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { selectFilteredProducts, fetchProducts } from "../store/productsSlice";
import "./ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.products?.status || "idle");
  const error = useSelector((state) => state.products?.error || null);
  
  // 使用安全的选择器获取过滤后的产品
  const products = useSelector((state) => {
    // 如果products还没有准备好，返回空数组
    if (!state.products?.items) return [];

    // 否则使用选择器
    return selectFilteredProducts(state);
  });

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
