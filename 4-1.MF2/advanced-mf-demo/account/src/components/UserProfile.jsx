import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((state) => state.shell?.user);

  if (!user) {
    return <div className="user-profile-empty">请登录</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-avatar">{user.name?.charAt(0) || "U"}</div>
      <div className="profile-details">
        <div className="user-name">{user.name}</div>
        <div className="user-email">{user.email}</div>
      </div>
    </div>
  );
};

export default UserProfile;
