// src/components/FullScreenLoader.jsx
import React from "react";
import "./FullScreenLoader.css";

const FullScreenLoader = ({ message = "Connecting to server..." }) => {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
      <p className="loader-text">{message}</p>
    </div>
  );
};

export default FullScreenLoader;
