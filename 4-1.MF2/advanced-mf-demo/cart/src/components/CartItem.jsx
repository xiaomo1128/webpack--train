import React from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../store/cartSlice";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, title, price, image, quantity } = item;

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      dispatch(updateQuantity({ productId: id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image} alt={title} />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">{title}</h3>
        <p className="cart-item-price">¥{price.toFixed(2)}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-control">
          <button
            className="quantity-btn"
            onClick={() =>
              dispatch(
                updateQuantity({ productId: id, quantity: quantity - 1 })
              )
            }
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
          <button
            className="quantity-btn"
            onClick={() =>
              dispatch(
                updateQuantity({ productId: id, quantity: quantity + 1 })
              )
            }
          >
            +
          </button>
        </div>
        <button className="remove-btn" onClick={handleRemove}>
          删除
        </button>
      </div>
      <div className="cart-item-subtotal">
        小计: ¥{(price * quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
