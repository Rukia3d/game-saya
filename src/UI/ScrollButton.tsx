import React from "react";
import "../App.css";

export const ScrollButton = ({
  onClick,
  direction,
}: {
  onClick: (a: any) => void;
  direction: "r" | "l" | "t" | "d";
}) => {
  const style = () => {
    switch (direction) {
      case "r":
        return "ChevronRight";
      case "l":
        return "ChevronLeft";
      case "t":
        return "ChevronUp";
      case "d":
        return "ChevronDown";
      default:
        return "ChevronRight";
    }
  };
  return (
    <div className="ScrollButton" onClick={onClick} data-testid="scroll_button">
      <div className={style()}></div>
    </div>
  );
};
