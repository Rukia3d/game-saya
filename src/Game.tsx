import axios from "axios";
import React, { useContext, useState } from "react";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";

export const Game = ({
  arcana,
  setArcana,
  setScreen,
}: {
  arcana: number | null;
  setArcana: (n: number | null) => void;
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.game) {
    throw new Error("No data in context");
  }
  const game = context.game;

  const close = () => {
    context.setGame(null);
    if ("checkpoint" in game) {
      setScreen("endless");
    } else if ("stake" in game) {
      setScreen("arena");
    } else {
      setScreen("story");
    }
  };

  const endEndless = async (n: number | null) => {
    if (!("checkpoint" in game)) {
      throw new Error("Can't end endless - issue with game type");
    }
    if (n == null) {
      await axios.post(`/api/players/${context.player.id}/missCheckpoint`, {
        arcana: game.arcanaId,
        mode: game.mode,
      });
      await context.mutate();
      close();
    } else {
      await axios.post(`/api/players/${context.player.id}/passCheckpoint`, {
        arcana: game.arcanaId,
        mode: game.mode,
        checkpoint: n,
      });
      await context.mutate();
    }
  };

  const endArena = async () => {
    if (!("stake" in game)) {
      throw new Error("Can't end arena - issue with game type");
    }
    await axios.post(`/api/players/${context.player.id}/endArena`, {
      eventMode: game.mode,
      eventIndx: game.index,
    });
    await context.mutate();
    close();
  };

  const winStory = async (win: boolean) => {
    if (!("state" in game)) {
      throw new Error("Can't end story - issue with game type");
    }
    if (win) {
      await axios.post(`/api/players/${context.player.id}/winLevel`, {
        arcana: game.arcanaId,
        mode: game.mode,
        level: game.id,
      });
      await context.mutate();
      close();
    }
  };

  if ("stake" in context.game) {
    // This is Arena event
    return (
      <div className="Game">
        <div className="CloseButton" onClick={close}>
          X
        </div>
        <h1>Arena event</h1>
        <button onClick={endArena}>end now</button>
      </div>
    );
  }

  if ("checkpoint" in context.game) {
    // This is Endless event
    return (
      <div className="Game">
        <div className="CloseButton" onClick={close}>
          X
        </div>
        <h1>Endless event</h1>
        <button onClick={() => endEndless(0)}>checkpoint 0</button>
        <button onClick={() => endEndless(1)}>checkpoint 1</button>
        <button onClick={() => endEndless(null)}>miss checkpoint</button>
      </div>
    );
  }

  // This is Story Event
  return (
    <div className="Game">
      <div className="CloseButton" onClick={close}>
        X
      </div>
      <h1>Story event</h1>
      <button onClick={() => winStory(true)}>win</button>
      <button onClick={() => winStory(false)}>loose</button>
    </div>
  );
};
