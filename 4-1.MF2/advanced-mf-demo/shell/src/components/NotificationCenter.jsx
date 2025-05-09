import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../store/shellSlice";
import "./NotificationCenter.css";

const NotificationCenter = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.shell.notifications);

  useEffect(() => {
    // 通知自动消失
    const timers = notifications.map((notification) => {
      return setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, 5000); // 5秒后自动消失
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [notifications, dispatch]);

  if (notifications.length === 0) return null;

  return (
    <div className="notification-center">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type || "info"}`}
        >
          <div className="notification-content">{notification.message}</div>
          <button
            className="notification-close"
            onClick={() => dispatch(removeNotification(notification.id))}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
