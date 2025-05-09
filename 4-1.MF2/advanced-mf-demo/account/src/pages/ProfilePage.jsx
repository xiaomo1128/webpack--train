import React from "react";
import { useSelector } from "react-redux";
import "./ProfilePage.css";

const ProfilePage = () => {
  const user = useSelector((state) => state.shell?.user);

  if (!user) {
    return (
      <div className="profile-page">
        <h1>个人资料</h1>
        <p>无法加载用户资料，请重新登录。</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1>个人资料</h1>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{user.name?.charAt(0) || "U"}</div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-detail">
            <span className="detail-label">会员状态</span>
            <span className="detail-value">普通会员</span>
          </div>

          <div className="profile-detail">
            <span className="detail-label">注册时间</span>
            <span className="detail-value">2023年10月1日</span>
          </div>

          <div className="profile-detail">
            <span className="detail-label">最后登录</span>
            <span className="detail-value">2023年11月15日</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-profile-btn">编辑资料</button>
          <button className="change-password-btn">修改密码</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
