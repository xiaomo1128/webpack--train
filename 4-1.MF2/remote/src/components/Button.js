import React from "react";
import "./Button.css";

const Button = ({ children = "Click Me", onClick }) => {
  return (
    <button className="remote-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
