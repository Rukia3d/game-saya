import React from "react";
import "./Human.scss";

// Human: https://codepen.io/rukia3d/pen/WNjNzBB
export const Human = () => {
  return (
    <div id="human">
      <div className="lemmy">
        <div className="hat"></div>
        <div className="head">
          <div className="eyes">
            <div className="eye"></div>
            <div className="eye eye-right"></div>
          </div>
          <div className="beard"></div>
        </div>
        <div className="body">
          <div className="arm"></div>
          <div className="arm arm-right"></div>
        </div>
        <div className="belt"></div>
        <div className="legs">
          <div className="leg"></div>
          <div className="leg leg-right"></div>
        </div>
      </div>
    </div>
  );
};
