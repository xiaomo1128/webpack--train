import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItems, selectCartTotal } from "../store/cartSlice";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <h1>结算</h1>
        <div className="empty-checkout">
          <p>您的购物车为空，无法进行结算</p>
          <Link to="/products" className="continue-shopping-btn">
            继续购物
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>结算</h1>

      <div className="checkout-summary">
        <h2>订单摘要</h2>

        <div className="order-items">
          {items.map((item) => (
            <div key={item.id} className="order-item">
              <div className="item-name">{item.title}</div>
              <div className="item-quantity">x{item.quantity}</div>
              <div className="item-price">
                ¥{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="order-total">
          <span>总计:</span>
          <span className="total-amount">¥{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="checkout-form">
        <h2>配送信息</h2>

        <form>
          <div className="form-group">
            <label htmlFor="name">姓名</label>
            <input type="text" id="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">电话</label>
            <input type="tel" id="phone" required />
          </div>

          <div className="form-group">
            <label htmlFor="address">地址</label>
            <textarea id="address" rows="3" required></textarea>
          </div>

          <h2>支付方式</h2>

          <div className="payment-methods">
            <div className="payment-method">
              <input type="radio" id="alipay" name="payment" value="alipay" />
              <label htmlFor="alipay">支付宝</label>
            </div>

            <div className="payment-method">
              <input type="radio" id="wechat" name="payment" value="wechat" />
              <label htmlFor="wechat">微信支付</label>
            </div>

            <div className="payment-method">
              <input type="radio" id="card" name="payment" value="card" />
              <label htmlFor="card">银行卡支付</label>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/cart" className="back-button">
              返回购物车
            </Link>
            <button type="submit" className="submit-order-button">
              提交订单
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
