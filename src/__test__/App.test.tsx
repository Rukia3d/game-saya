import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { gameState } from "../utils/testobjects";

const mainMenuActiveStyle = "background-color: aquamarine;";
const mainMenuInActiveStyle = "background-color: lightgrey;";

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    //@ts-ignore
    Promise.resolve({
      json: () => Promise.resolve(gameState),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

test("Renders App Start Screen", async () => {
  render(<App />);
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(await screen.findByText("PLAY")).toBeInTheDocument();
});

test("Settings screen switches on and off", async () => {
  render(<App />);
  expect(await screen.findByText("PLAY")).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "PLAY" }));
  expect(screen.queryByLabelText("settings_screen")).not.toBeInTheDocument();
  expect(screen.getByTestId("settings_button")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("settings_button"));
  expect(screen.getByLabelText("settings_screen")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("settings_button"));
  expect(screen.queryByLabelText("settings_screen")).not.toBeInTheDocument();
});

test("Main Menu buttons switch works", async () => {
  render(<App />);
  expect(await screen.findByText("PLAY")).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "PLAY" }));
  expect(screen.getByAltText("intro_background")).toBeInTheDocument();
  expect(screen.getByText("CITY")).toHaveAttribute(
    "style",
    mainMenuActiveStyle
  );
});

test("Renders Main screen for existing player with Hero menu active", async () => {
  render(<App />);
  expect(await screen.findByText("PLAY")).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "PLAY" }));
  expect(screen.getByText("CITY")).toBeInTheDocument();
  expect(screen.getByAltText("intro_background")).toBeInTheDocument();
  expect(screen.getByText("ADVENTURES")).toBeInTheDocument();
  expect(screen.getByText("LIBRARY")).toBeInTheDocument();
  expect(screen.getByText("SHOP")).toBeInTheDocument();
  expect(screen.getByAltText("hero_maya")).toHaveAttribute(
    "src",
    expect.stringContaining("maya.png")
  );
  // Correct button is highlighted
  expect(screen.getByText("CITY")).toHaveAttribute(
    "style",
    mainMenuActiveStyle
  );
  expect(screen.getByText("ADVENTURES")).toHaveAttribute(
    "style",
    mainMenuInActiveStyle
  );
  expect(screen.getByText("LIBRARY")).toHaveAttribute(
    "style",
    mainMenuInActiveStyle
  );
  expect(screen.getByText("SHOP")).toHaveAttribute(
    "style",
    mainMenuInActiveStyle
  );
  // Switch the screen - correct button is highlighted
  userEvent.click(screen.getByText("ADVENTURES"));
  expect(screen.getByText("CITY")).toHaveAttribute(
    "style",
    mainMenuInActiveStyle
  );
  expect(screen.getByText("ADVENTURES")).toHaveAttribute(
    "style",
    mainMenuActiveStyle
  );
  expect(screen.getByText("LIBRARY")).toHaveAttribute(
    "style",
    mainMenuInActiveStyle
  );
});

test("Renders Adventures screen with all available adventures", async () => {
  render(<App />);
  expect(await screen.findByText("PLAY")).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "PLAY" }));
  userEvent.click(screen.getByText("ADVENTURES"));
  expect(screen.getByText("ADVENTURES")).toBeInTheDocument();
  expect(screen.getByLabelText("adventures_background")).toBeInTheDocument();

  // Correct button is highlighted
  expect(screen.getByText("ADVENTURES")).toHaveAttribute(
    "style",
    mainMenuActiveStyle
  );

  // Active and inactive adventures have different opacity
  expect(screen.getByAltText("adventure_story")).toHaveAttribute(
    "src",
    expect.stringContaining("story")
  );
  expect(screen.getByAltText("adventure_arena")).toHaveAttribute(
    "src",
    expect.stringContaining("arena")
  );

  // Only active adventure shows a popup
  userEvent.click(screen.getByAltText("adventure_story"));
  expect(screen.getByLabelText("story_background")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("close_button"));
  userEvent.click(screen.getByAltText("adventure_arena"));
  // TODO add check that the correct adventure is on the screen
});

test("Renders Story screen and loads the story", async () => {
  render(<App />);
  expect(await screen.findByText("Start")).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "PLAY" }));
  userEvent.click(screen.getByText("ADVENTURES"));
  userEvent.click(screen.getByLabelText("adventure_border_story"));
  expect(screen.getByAltText("story_dialogue1")).toHaveAttribute(
    "src",
    expect.stringContaining("dialogue1.jpg")
  );
  expect(screen.getByAltText("story_arena1")).toHaveAttribute(
    "src",
    expect.stringContaining("arena1.jpg")
  );
});
