import React from "react";
import "./Shop.scss";
// Types
// Utils
// Components
const imgUrl = `/img/Backgrounds/shop_background.jpg`;
export const Shop = () => {
  return (
    <div
      className="Shop"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    ></div>
  );
};
