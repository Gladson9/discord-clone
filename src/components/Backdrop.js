import React from "react";
import "../assets/styles/backdrop.css";

const Backdrop = ({ children, onClick }) => {
  return (
    <div className="backdrop" onClick={onClick}>
      {children}
    </div>
  );
};

export default Backdrop;