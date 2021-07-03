import React from "react";
import "../App.css";

export const CloseButton = ({ onClick }: { onClick: (a: any) => void }) => {
  return (
    <div className="CloseButton" onClick={onClick} data-testid="close_button">
      X
    </div>
  );
};
