import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App.js";
import "@testing-library/jest-dom/extend-expect";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
//Test each of the components and functions
//UI improvement
//Use Typescript
