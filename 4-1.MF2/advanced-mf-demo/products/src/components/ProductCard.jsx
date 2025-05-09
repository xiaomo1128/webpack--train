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
    } else {
      // 尝试通过全局事件总线触发添加到购物车事件
      try {
        // 首先尝试直接调用cart模块的addToCart action
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
