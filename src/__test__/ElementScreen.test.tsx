import React from "react";
import { render, screen } from "@testing-library/react";
import {
  arenaMode,
  elementName,
  IPlayer,
  levelState,
} from "../../api/engine/types";
import { Elements } from "../Elements/Elements";
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
    { id: 3, name: "Air essence", quantity: 6 },
    { id: 4, name: "Fire essence", quantity: 0 },
    { id: 5, name: "Metal essence", quantity: 0 },
    { id: 6, name: "Stone essence", quantity: 0 },
    { id: 7, name: "Water essence", quantity: 0 },
  ],
  elements: [
    {
      element: "air" as elementName,
      id: 0,
      characterName: "Saya",
      stories: [
        {
          id: 0,
          level: "",
          name: "air story0",
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
          name: "air story1",
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
          name: "air story2",
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
        { id: 0, level: "", type: "tournament" as arenaMode, energy: 10 },
        { id: 0, level: "", type: "tower" as arenaMode, energy: 10 },
      ],
    },
  ],
  spells: [],
  missions: [] as IPlayer["missions"],
  messages: [] as IPlayer["messages"],
  currentState: { state: "MAIN" },
};
const context: GameContextType = {
  mutate: jest.fn(),
  player: player,
  element: 0,
  setElement: jest.fn(),
  setGame: jest.fn(),
  game: null,
  changeMainScreen: jest.fn(),
  changeElementScreen: jest.fn(),
};

test("Renders ElementScreen correctly for player 1 element 0", () => {
  render(
    <GameContext.Provider value={context}>
      <Elements />
    </GameContext.Provider>
  );
  expect(screen.getByTestId("element-screen")).toBeInTheDocument();
});
