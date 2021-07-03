import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const mainMenuActiveColor = "aquamarine";
const mainMenuInActiveColor = "grey";

test("Renders App Start Screen", () => {
  render(<App />);
  expect(screen.getByText("Start")).toBeInTheDocument();
});

test("Main Menu buttons switch works", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button", { name: "PLAY" }));
  expect(screen.getByText("Your Heroes")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Heroes" })).toHaveAttribute(
    "style",
    `background-color: ${mainMenuActiveColor};`
  );
});

test("Renders Main screen for existing player with Hero menu active", () => {
  render(<App />);
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

test("Renders Adventures screen with all available adventures", () => {
  render(<App />);
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
    expect.stringContaining("storyline.png")
  );
  expect(screen.getByAltText("adventure_story")).toHaveAttribute(
    "style",
    "opacity: 1;"
  );
  expect(screen.getByAltText("adventure_arena")).toHaveAttribute(
    "src",
    expect.stringContaining("devastation.png")
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
