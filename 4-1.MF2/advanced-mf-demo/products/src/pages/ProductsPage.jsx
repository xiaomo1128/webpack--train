import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../components/ProductList";
import { setFilter, resetFilter } from "../store/productsSlice";
import "./ProductsPage.css";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products.filter);
  const [searchInput, setSearchInput] = useState(filter.searchTerm || "");

  const handleCategoryChange = (e) => {
    dispatch(setFilter({ category: e.target.value }));
  };

  const handlePriceChange = (type, value) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      dispatch(setFilter({ [type]: numValue }));
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilter({ searchTerm: searchInput }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilter());
    setSearchInput("");
  };

  return (
    <div className="products-page">
      <h1 className="products-title">所有商品</h1>

      <div className="filters-container">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="搜索商品..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">搜索</button>
        </form>

        <div className="filter-group">
          <h3>商品分类</h3>
          <div className="category-options">
            <label>
              <input
                type="radio"
                name="category"
                value=""
                checked={!filter.category}
                onChange={handleCategoryChange}
              />
              所有分类
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="smartphone"
                checked={filter.category === "smartphone"}
                onChange={handleCategoryChange}
              />
              智能手机
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="laptop"
                checked={filter.category === "laptop"}
                onChange={handleCategoryChange}
              />
              笔记本电脑
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="tablet"
                checked={filter.category === "tablet"}
                onChange={handleCategoryChange}
              />
              平板电脑
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="audio"
                checked={filter.category === "audio"}
                onChange={handleCategoryChange}
              />
              音频设备
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="wearable"
                checked={filter.category === "wearable"}
                onChange={handleCategoryChange}
              />
              可穿戴设备
            </label>
          </div>
        </div>

        <div className="filter-group">
          <h3>价格范围</h3>
          <div className="price-range">
            <input
              type="number"
              min="0"
              placeholder="最低"
              value={filter.minPrice}
              onChange={(e) => handlePriceChange("minPrice", e.target.value)}
            />
            <span>至</span>
            <input
              type="number"
              min="0"
              placeholder="最高"
              value={filter.maxPrice}
              onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
            />
          </div>
        </div>

        <button className="reset-button" onClick={handleResetFilters}>
          重置筛选
        </button>
      </div>

      <ProductList />
    </div>
  );
};

export default ProductsPage;
