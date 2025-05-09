import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../store/cartSlice";
import CartItem from "../components/CartItem";
import "./CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const handleClearCart = () => {
    if (window.confirm("确定要清空购物车吗？")) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1>购物车</h1>
        <div className="empty-cart">
          <p>您的购物车为空</p>
          <Link to="/products" className="continue-shopping-btn">
            继续购物
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>购物车</h1>
      <div className="cart-header">
        <div className="cart-header-left">
          <span>{items.length} 件商品</span>
        </div>
        <div className="cart-header-right">
          <button className="clear-cart-btn" onClick={handleClearCart}>
            清空购物车
          </button>
        </div>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>总计:</span>
          <span className="total-amount">¥{total.toFixed(2)}</span>
        </div>
        <div className="cart-actions">
          <Link to="/products" className="continue-shopping-btn">
            继续购物
          </Link>
          <Link to="/cart/checkout" className="checkout-btn">
            结算
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
