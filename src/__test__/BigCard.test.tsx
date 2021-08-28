import React from "react";
import { render, screen } from "@testing-library/react";
import { BigCard } from "../Fight/BigCard";
import userEvent from "@testing-library/user-event";

import { mayaCard } from "../utils/testobjects";

test("Renders Big Card screen", async () => {
  const setInfo = jest.fn();
  render(<BigCard card={mayaCard} setInfo={setInfo} element="earth" />);
  expect(screen.getByText("Maya Hit 1")).toBeInTheDocument();
  expect(screen.getByText("Info")).toBeInTheDocument();
  userEvent.click(screen.getByText("Info"));
  expect(setInfo.mock.calls.length).toBe(1);
});
