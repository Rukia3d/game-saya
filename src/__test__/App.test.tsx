import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

import { cache } from "swr";

afterEach(() => {
  cache.clear();
});

const mainMenuActiveColor = "aquamarine";
const mainMenuInActiveColor = "grey";

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
  expect(screen.getByText("Your Heroes")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Heroes" })).toHaveAttribute(
    "style",
    `background-color: ${mainMenuActiveColor};`
  );
});

test("Renders Main screen for existing player with Hero menu active", async () => {
  render(<App />);
  expect(await screen.findByText("PLAY")).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "PLAY" }));
  expect(screen.getByText("Heroes")).toBeInTheDocument();
  expect(screen.getByText("Your Heroes")).toBeInTheDocument();
  expect(screen.getByText("Adventures")).toBeInTheDocument();
  expect(screen.getByText("Spells")).toBeInTheDocument();
  expect(screen.getByAltText("hero_maya")).toHaveAttribute(
    "src",
    expect.stringContaining("maya.png")
  );
  // Correct button is highlighted
  expect(screen.getByRole("button", { name: "Heroes" })).toHaveAttribute(
    "style",
    `background-color: ${mainMenuActiveColor};`
  );
  expect(screen.getByRole("button", { name: "Adventures" })).toHaveAttribute(
    "style",
    `background-color: ${mainMenuInActiveColor};`
  );
  expect(screen.getByRole("button", { name: "Spells" })).toHaveAttribute(
    "style",
    `background-color: ${mainMenuInActiveColor};`
  );
  // Switch the screen - correct button is highlighted
  userEvent.click(screen.getByRole("button", { name: "Adventures" }));
  expect(screen.getByRole("button", { name: "Heroes" })).toHaveAttribute(
    "style",
    `background-color: ${mainMenuInActiveColor};`
  );
  expect(screen.getByRole("button", { name: "Adventures" })).toHaveAttribute(
    "style",
    `background-color: ${mainMenuActiveColor};`
  );
  expect(screen.getByRole("button", { name: "Spells" })).toHaveAttribute(
    "style",
    `background-color: ${mainMenuInActiveColor};`
  );
});

test("Renders Adventures screen with all available adventures", async () => {
  render(<App />);
  expect(await screen.findByText("PLAY")).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "PLAY" }));
  userEvent.click(screen.getByRole("button", { name: "Adventures" }));
  expect(screen.getByText("Your Adventures")).toBeInTheDocument();
  expect(screen.getByText("Adventures")).toBeInTheDocument();

  // Correct button is highlighted
  expect(screen.getByRole("button", { name: "Adventures" })).toHaveAttribute(
    "style",
    `background-color: ${mainMenuActiveColor};`
  );

  // Active and inactive adventures have different opacity
  expect(screen.getByAltText("adventure_story")).toHaveAttribute(
    "src",
    expect.stringContaining("story")
  );
  expect(screen.getByAltText("adventure_story")).toHaveAttribute(
    "style",
    "opacity: 1;"
  );
  expect(screen.getByAltText("adventure_arena")).toHaveAttribute(
    "src",
    expect.stringContaining("arena")
  );
  expect(screen.getByAltText("adventure_arena")).toHaveAttribute(
    "style",
    "opacity: 0.5;"
  );

  // Only active adventure shows a popup
  userEvent.click(screen.getByAltText("adventure_story"));
  expect(screen.getByText("Act 1")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("close_button"));
  userEvent.click(screen.getByAltText("adventure_arena"));
  expect(screen.queryByText("Arena")).not.toBeInTheDocument();
});

test("Renders Story screen and loads the story", async () => {
  render(<App />);
  expect(await screen.findByText("Start")).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "PLAY" }));
  userEvent.click(screen.getByRole("button", { name: "Adventures" }));
  userEvent.click(screen.getByAltText("adventure_story"));
  expect(screen.getByText("Act 1")).toBeInTheDocument();
  expect(screen.getByAltText("story_fight1")).toHaveAttribute(
    "src",
    expect.stringContaining("arena_1.png")
  );
  expect(screen.getByAltText("story_dial1")).toHaveAttribute(
    "src",
    expect.stringContaining("dialogue_1.png")
  );

  // Click on inactive panel doesn't have an effect
  userEvent.click(screen.getByAltText("story_fight2"));
  expect(screen.queryByText(/Your opponent/)).not.toBeInTheDocument();
  userEvent.click(screen.getByAltText("story_fight1"));
  expect(screen.queryByText(/Your opponent/)).toBeInTheDocument();
});
