import React from "react";
import "./Stories.css";
// Types
import { herosSelectionError } from "../utils/types";
import { HeroesSelection } from "../Main/Heroes";
// Utils
// Components

const getHeaderText = (error: herosSelectionError) => {
  "Select heroes";
  switch (error) {
    case "none":
      return "No heros selected";
    case "less":
      return "You need more heroes for this fight";
    case "more":
      return "Number of heroes for this fight is limited";
    case "incorrect":
      return "This fight is restricted";
    default:
      return "Select heroes";
  }
};

export const StoryHeroes = ({
  error,
  setSelectionError,
}: {
  error: herosSelectionError;
  setSelectionError: (s: herosSelectionError) => void;
}) => {
  console.log("Error", error);
  return (
    <div className="StoryHeroes">
      <div className="InfoCard" aria-label="info_card">
        <h1>{getHeaderText(error)}</h1>
        <HeroesSelection />
      </div>
    </div>
  );
};
