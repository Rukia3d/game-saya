import React from "react";
import { render, screen } from "@testing-library/react";
import {
  arcanaName,
  gameMode,
  IPlayer,
  IServer,
  levelState,
} from "../../api/engine/types";
import { Arcanas } from "../Arcanas/Arcanas";
import { GameContext, GameContextType } from "../App";

const player: IPlayer = {
  id: 1,
  name: "player 0 name",
  exprience: 10,
  energy: 45,
  maxEnergy: 50,
  loungeId: null,
  materials: [
    { id: 0, name: "Coin", quantity: 18 },
    { id: 1, name: "Black Soul Stone", quantity: 0 },
    { id: 2, name: "White Soul Stone", quantity: 0 },
    { id: 3, name: "Rings", quantity: 6 },
    { id: 4, name: "Wands", quantity: 0 },
    { id: 5, name: "Swords", quantity: 0 },
    { id: 6, name: "Cups", quantity: 0 },
    { id: 7, name: "Dimonds", quantity: 0 },
  ],
  arcanas: [
    {
      arcanaName: "rings" as arcanaName,
      id: 0,
      characterName: "Saya",
      stories: [
        {
          id: 0,
          level: "",
          name: "Saya story 0",
          mode: "story",
          state: "complete" as levelState,
          allowedRewards: [
            { id: 0, upTo: 10 },
            { id: 3, upTo: 3 },
          ],
          experience: 10,
          energy: 5,
        },
        {
          id: 1,
          level: "",
          name: "Saya story 1",
          mode: "story",
          state: "open" as levelState,
          allowedRewards: [
            { id: 0, upTo: 50 },
            { id: 3, upTo: 3 },
            { id: 4, upTo: 3 },
          ],
          experience: 10,
          energy: 5,
        },
        {
          id: 2,
          level: "",
          name: "Saya story 2",
          mode: "story",
          state: "closed" as levelState,
          allowedRewards: [
            { id: 0, upTo: 50 },
            { id: 3, upTo: 3 },
            { id: 4, upTo: 3 },
          ],
          experience: 10,
          energy: 5,
        },
      ],
      legend: ["Saya story line 1", "Saya story line 2"],
      currentQuests: [],
      currentEvents: [
        {
          id: 0,
          level: "",
          mode: "tournament" as gameMode,
          energy: 10,
          checkpoint: 0,
          allowedRewards: [
            { id: 0, upTo: 50 },
            { id: 3, upTo: 3 },
            { id: 4, upTo: 3 },
          ],
        },
        {
          id: 0,
          level: "",
          mode: "tower" as gameMode,
          energy: 10,
          checkpoint: 0,
          allowedRewards: [
            { id: 0, upTo: 50 },
            { id: 3, upTo: 3 },
            { id: 4, upTo: 3 },
          ],
        },
      ],
    },
  ],
  spells: [],
  missions: [] as IPlayer["missions"],
  messages: [] as IPlayer["messages"],
  currentState: { state: "MAIN" },
};

const server: IServer = {
  arenaRun: { events: [], resultTime: 0, type: "run" },
  arenaFight: { events: [], resultTime: 0, type: "fight" },
  arenaFightHistory: [],
  arenaRunHistory: [],
};
const context: GameContextType = {
  mutate: jest.fn(),
  player: player,
  server: server,
  arcana: 0,
  setArcana: jest.fn(),
  setGame: jest.fn(),
  setWin: jest.fn(),
  game: null,
  changeMainScreen: jest.fn(),
  changeArcanaScreen: jest.fn(),
};

test("Renders arcanaScreen correctly for player 1 arcana 0", () => {
  render(
    <GameContext.Provider value={context}>
      <Arcanas />
    </GameContext.Provider>
  );
  expect(screen.getByTestId("arcana-screen")).toBeInTheDocument();
});
