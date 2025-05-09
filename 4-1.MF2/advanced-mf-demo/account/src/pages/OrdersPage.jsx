import React from "react";
import { useSelector } from "react-redux";

const OrdersPage = () => {
  const orders = useSelector((state) => state.account?.orders || []);

  return (
    <div className="orders-page">
      <h1>我的订单</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>您目前没有订单记录</p>
          <button className="shop-now-btn">立即购物</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <span className="order-number">订单号: {order.number}</span>
                  <span className="order-date">下单日期: {order.date}</span>
                </div>
                <div className="order-status">{order.status}</div>
              </div>
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">¥{item.price}</div>
                      <div className="item-quantity">x{item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <div className="order-total">总计: ¥{order.total}</div>
                <div className="order-actions">
                  <button className="details-btn">查看详情</button>
                  <button className="reorder-btn">再次购买</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
