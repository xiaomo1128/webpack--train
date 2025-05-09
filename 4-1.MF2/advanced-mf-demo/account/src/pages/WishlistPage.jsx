import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/accountSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.account?.wishlist || []);

  const handleRemove = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  return (
    <div className="wishlist-page">
      <h1>我的收藏</h1>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>您的收藏夹是空的</p>
          <button className="shop-now-btn">立即购物</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  ×
                </button>
              </div>
              <div className="item-info">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-price">¥{item.price}</div>
                <button className="add-to-cart-btn">加入购物车</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
