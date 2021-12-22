import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { gameState } from "../utils/teststates";

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

test("Lives screen switches on and off", async () => {
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
