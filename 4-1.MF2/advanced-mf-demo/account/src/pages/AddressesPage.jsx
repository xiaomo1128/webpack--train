import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addAddress,
  updateAddress,
  removeAddress,
} from "../store/accountSlice";

const AddressesPage = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.account?.addresses || []);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    province: "",
    city: "",
    district: "",
    address: "",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    if (editingAddressId) {
      dispatch(updateAddress({ id: editingAddressId, address: formData }));
      setEditingAddressId(null);
    } else {
      dispatch(addAddress({ id: Date.now(), ...formData }));
    }

    setIsAddingAddress(false);
    setFormData({
      name: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      address: "",
      isDefault: false,
    });
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingAddressId(address.id);
    setIsAddingAddress(true);
  };

  const handleRemove = (id) => {
    if (window.confirm("确定要删除这个地址吗？")) {
      dispatch(removeAddress(id));
    }
  };

  return (
    <div className="addresses-page">
      <h1>收货地址</h1>

      {isAddingAddress ? (
        <div className="address-form-container">
          <h2>{editingAddressId ? "编辑地址" : "新增地址"}</h2>
          <form className="address-form" onSubmit={handleAddressSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">收货人</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">手机号码</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="province">省份</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">城市</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="district">区县</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">详细地址</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-inline">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                />
                <span>设为默认地址</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                保存
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setIsAddingAddress(false);
                  setEditingAddressId(null);
                }}
              >
                取消
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <button
            className="add-address-btn"
            onClick={() => setIsAddingAddress(true)}
          >
            添加新地址
          </button>

          {addresses.length === 0 ? (
            <div className="empty-addresses">
              <p>您还没有添加收货地址</p>
            </div>
          ) : (
            <div className="addresses-list">
              {addresses.map((address) => (
                <div key={address.id} className="address-card">
                  <div className="address-header">
                    <div className="address-name">{address.name}</div>
                    <div className="address-phone">{address.phone}</div>
                    {address.isDefault && (
                      <div className="default-badge">默认</div>
                    )}
                  </div>
                  <div className="address-content">
                    {address.province} {address.city} {address.district}{" "}
                    {address.address}
                  </div>
                  <div className="address-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(address)}
                    >
                      编辑
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleRemove(address.id)}
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddressesPage;
