import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../store/cartSlice";
import "./MiniCart.css";

const MiniCart = ({ onClose }) => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="mini-cart">
        <div className="mini-cart-header">
          <h3>购物车</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="mini-cart-empty">
          <p>购物车为空</p>
          <Link to="/products" onClick={onClose}>
            去购物
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mini-cart">
      <div className="mini-cart-header">
        <h3>购物车 ({items.length})</h3>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="mini-cart-items">
        {items.map((item) => (
          <div key={item.id} className="mini-cart-item">
            <div className="mini-cart-item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="mini-cart-item-details">
              <h4>{item.title}</h4>
              <div className="mini-cart-item-price">
                ¥{item.price.toFixed(2)} × {item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mini-cart-footer">
        <div className="mini-cart-total">
          <span>总计:</span>
          <span className="total-price">¥{total.toFixed(2)}</span>
        </div>
        <div className="mini-cart-actions">
          <Link to="/cart" className="view-cart-btn" onClick={onClose}>
            查看购物车
          </Link>
          <Link to="/cart/checkout" className="checkout-btn" onClick={onClose}>
            结算
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
