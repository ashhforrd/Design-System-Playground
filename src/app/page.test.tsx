import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /component playground/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /primary/i }),
    ).toBeInTheDocument();
  });
});
