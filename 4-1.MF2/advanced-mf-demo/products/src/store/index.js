import productsReducer, {
  fetchProducts,
  setFilter,
  resetFilter,
  selectAllProducts,
  selectFilteredProducts,
  selectProductById,
} from "./productsSlice";

// 导出reducer和actions
export default productsReducer;
export {
  fetchProducts,
  setFilter,
  resetFilter,
  selectAllProducts,
  selectFilteredProducts,
  selectProductById,
};
