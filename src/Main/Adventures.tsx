import React, { useContext } from "react";
import { GameContext } from "../App";
import "./Adventures.scss";
// Types
import { IAdventure } from "../utils/types";
// Utils
// Components
import { Lock } from "../UI/Lock";

const AdventureArena = ({
  adventure,
  selectAdventure,
}: {
  adventure: IAdventure;
  selectAdventure: (a: IAdventure) => void;
}) => {
  const imgUrl = `/img/Backgrounds/adventure_${adventure.id}_background.jpg`;
  return (
    <div
      className="AdventureArenaBorder"
      onClick={() =>
        adventure.storyGroups ? selectAdventure(adventure) : null
      }
    >
      {/* {!adventure.open ? <Lock /> : null} */}
      <div
        className="AdventureArena"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <h3>{adventure.name}</h3>
      </div>
    </div>
  );
};

const AdventureStory = ({
  adventure,
  selectAdventure,
}: {
  adventure: IAdventure;
  selectAdventure: (a: IAdventure) => void;
}) => {
  const imgUrl = `/img/Backgrounds/adventure_${adventure.id}_background.jpg`;
  return (
    <div
      className="AdventureStoryBorder"
      onClick={() =>
        adventure.storyGroups ? selectAdventure(adventure) : null
      }
    >
      {/* {!adventure.open ? <Lock /> : null} */}
      <div
        className="AdventureStory"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <h3>{adventure.name}</h3>
      </div>
    </div>
  );
};

const AdventureTournament = ({
  adventure,
  selectAdventure,
}: {
  adventure: IAdventure;
  selectAdventure: (a: IAdventure) => void;
}) => {
  const imgUrl = `/img/Backgrounds/adventure_${adventure.id}_background.jpg`;
  return (
    <div
      className="AdventureTournamentBorder"
      onClick={() =>
        adventure.storyGroups ? selectAdventure(adventure) : null
      }
    >
      {/* {!adventure.open ? <Lock /> : null} */}
      <div
        className="AdventureTournament"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <h3>{adventure.name}</h3>
      </div>
    </div>
  );
};

const AdventureEvent = ({
  adventure,
  selectAdventure,
}: {
  adventure: IAdventure;
  selectAdventure: (a: IAdventure) => void;
}) => {
  const imgUrl = `/img/Backgrounds/adventure_${adventure.id}_background.jpg`;
  return (
    <div
      className="AdventureEventBorder"
      onClick={() =>
        adventure.storyGroups ? selectAdventure(adventure) : null
      }
    >
      {/* {!adventure.open ? <Lock /> : null} */}
      <div
        className="AdventureEvent"
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
  console.log(context.gameState.player.adventures);
  return (
    <div className="Adventures">
      <div className="AdventuresTop">
        <AdventureStory
          selectAdventure={selectAdventure}
          adventure={context.gameState.player.adventures[0]}
        />
        <AdventureArena
          selectAdventure={selectAdventure}
          adventure={context.gameState.player.adventures[2]}
        />
      </div>
      <div className="AdventuresBottom">
        <AdventureTournament
          selectAdventure={selectAdventure}
          adventure={context.gameState.player.adventures[3]}
        />
        <AdventureEvent
          selectAdventure={selectAdventure}
          adventure={context.gameState.player.adventures[4]}
        />
      </div>
    </div>
  );
};
