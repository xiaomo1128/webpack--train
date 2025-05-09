import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const { id, title, price, image, description } = product;
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onAddToCart) {
      onAddToCart(product);
      return;
    }

    // 使用事件总线通信，不再尝试直接导入cart模块
    if (window.__MFE_EVENT_BUS__) {
      // 发送添加购物车事件
      window.__MFE_EVENT_BUS__.emit("add-to-cart", {
        product,
        quantity: 1,
      });

      // 发送产品已添加通知事件
      window.__MFE_EVENT_BUS__.emit("product-added-to-cart", product);
      console.log("已通过事件总线发送添加购物车事件");
    } else {
      console.error("事件总线未初始化");
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${id}`} className="product-link">
        <div className="product-image">
          <img src={image} alt={title} />
        </div>
        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          <p className="product-price">¥{price.toFixed(2)}</p>
          <p className="product-description">
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </p>
        </div>
      </Link>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        加入购物车
      </button>
    </div>
  );
};

export default ProductCard;
