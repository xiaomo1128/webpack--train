export const CartActions = {
  ADD_TO_CART: "add-to-cart",
  REMOVE_FROM_CART: "remove-from-cart",
  UPDATE_QUANTITY: "update-cart-quantity",
  PRODUCT_ADDED: "product-added-to-cart",
};

// 定义事件数据结构
export const CartEventSchema = {
  [CartActions.ADD_TO_CART]: {
    product: {
      /* 产品结构 */
    },
    quantity: "number",
  },
};
