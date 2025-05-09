import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/productApi";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { productId } = useParams();
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
    // 使用事件总线进行通信
    if (window.__MFE_EVENT_BUS__ && product) {
      // 发送添加购物车事件
      window.__MFE_EVENT_BUS__.emit("add-to-cart", {
        product,
        quantity: 1,
      });

      // 发送产品已添加通知
      window.__MFE_EVENT_BUS__.emit("product-added-to-cart", product);
      console.log("已通过事件总线发送添加购物车事件");
    } else {
      console.error("事件总线未初始化或产品数据未加载");
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
