import React from "react";
import "../App.css";

export const SettingsButton = ({ onClick }: { onClick: (a: any) => void }) => {
  return (
    <div
      className="CloseButton"
      onClick={onClick}
      data-testid="settings_button"
    >
      G
    </div>
  );
};
