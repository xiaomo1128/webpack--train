import React from "react";
import "./Card.css";

const Card = ({ title, description, children }) => {
  return (
    <div className="remote-card">
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      {children}
    </div>
  );
};

export default Card;
