import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer.js";

test.skip("Useful links in footer would be rendered", () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(
    / Get connected with us on social networks/i
  );
  expect(linkElement).toBeInTheDocument();
});
