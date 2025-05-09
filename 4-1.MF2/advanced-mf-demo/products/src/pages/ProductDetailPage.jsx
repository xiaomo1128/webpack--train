import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductById } from "../api/productApi";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProductById(productId)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    try {
      // 尝试直接调用cart模块的addToCart action
      import("cart/store")
        .then(({ addToCart }) => {
          dispatch(addToCart({ product, quantity: 1 }));
          window.__MFE_EVENT_BUS__?.emit("product-added-to-cart", product);
        })
        .catch((err) => {
          // 如果直接导入失败，就通过事件总线通知
          console.warn("无法直接调用购物车模块:", err);
          window.__MFE_EVENT_BUS__?.emit("add-to-cart", {
            product,
            quantity: 1,
          });
        });
    } catch (error) {
      console.error("添加到购物车失败:", error);
    }
  };

  if (loading) {
    return <div>加载商品详情...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <Link to="/products">返回商品列表</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <div className="error-message">商品不存在</div>
        <Link to="/products">返回商品列表</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-breadcrumb">
        <Link to="/products">商品</Link> / {product.title}
      </div>

      <div className="product-content">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <div className="product-price">¥{product.price.toFixed(2)}</div>
          <div className="product-category">分类: {product.category}</div>

          <div className="product-description">{product.description}</div>

          <div className="product-actions">
            <button className="btn btn-primary" onClick={handleAddToCart}>
              加入购物车
            </button>

            <Link to="/products" className="btn btn-secondary">
              继续购物
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
