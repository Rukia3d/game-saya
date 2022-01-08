import React, { useContext } from "react";
import { GameContext } from "../App";
import "./Adventures.scss";
// Types
import { IAdventure } from "../utils/types";
// Utils
// Components
import { Lock } from "../UI/Lock";
import { capitalizeFirstLetter } from "../utils/helpers";

const GenericAdventure = ({
  adventure,
  selectAdventure,
}: {
  adventure: IAdventure;
  selectAdventure: (a: IAdventure) => void;
}) => {
  const imgUrl = `/img/Backgrounds/adventure_${adventure.id}_background.jpg`;
  const adventureTitle = capitalizeFirstLetter(adventure.type);
  return (
    <div
      className={`Adventure${adventureTitle}Border`}
      style={{
        opacity: `${
          adventure.open || adventure.type === "character" ? 1 : 0.5
        }`,
      }}
      aria-label={`adventure-${adventure.type}`}
      onClick={() =>
        adventure.storyGroups ? selectAdventure(adventure) : null
      }
    >
      {!adventure.open ? <Lock /> : null}
      <div
        className={`Adventure${adventureTitle}`}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <h3>{adventure.name}</h3>
      </div>
    </div>
  );
};

const AdventureCharacter = ({
  adventure,
  selectAdventure,
}: {
  adventure: IAdventure;
  selectAdventure: (a: IAdventure) => void;
}) => {
  const imgUrl = `/img/Backgrounds/adventure_${adventure.id}_background.jpg`;
  return (
    <div
      className="AdventureCharacterBorder"
      aria-label="adventure-character"
      onClick={() =>
        adventure.storyGroups ? selectAdventure(adventure) : null
      }
    >
      {!adventure.open ? <Lock /> : null}
      <div
        className="AdventureCharacter"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <h3>{adventure.name}</h3>
      </div>
    </div>
  );
};

export const Adventures = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.player.adventures) {
    throw new Error("No data");
  }

  const selectAdventure = (a: IAdventure) => {
    if (a.open) {
      context.setAdventure(a);
    }
  };
  const topAdventures = [
    context.gameState.player.adventures[0],
    context.gameState.player.adventures[1],
  ];
  const bottomAdventures = [
    context.gameState.player.adventures[2],
    context.gameState.player.adventures[3],
  ];
  const imgUrl = `/img/Backgrounds/adventure_background.jpg`;
  return (
    <div
      className="Adventures"
      aria-label="adventures-background"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="AdventuresList">
        <div className="AdventuresTop">
          {topAdventures.map((a: IAdventure, i: number) => (
            <GenericAdventure
              adventure={a}
              selectAdventure={selectAdventure}
              key={i}
            />
          ))}
        </div>
        <div className="AdventuresBottom">
          {bottomAdventures.map((a: IAdventure, i: number) => (
            <GenericAdventure
              adventure={a}
              selectAdventure={selectAdventure}
              key={i}
            />
          ))}
        </div>
        <div className="AdventuresAbsolute">
          <GenericAdventure
            adventure={context.gameState.player.adventures[4]}
            selectAdventure={selectAdventure}
          />
        </div>
      </div>
    </div>
  );
};
