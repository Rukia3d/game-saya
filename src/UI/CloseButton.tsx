import React from "react";
import "../App.css";
// Types
// Utils
// Components

export const CloseButton = ({ onClick }: { onClick: (a: any) => void }) => {
  return (
    <div
      className="CloseButton"
      onClick={onClick}
      data-testid="close_button"
    ></div>
  );
};
