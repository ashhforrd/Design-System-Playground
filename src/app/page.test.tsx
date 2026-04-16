import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders a single control to open the playground", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /open playground/i });
    expect(button).toBeInTheDocument();
    expect(button.closest("form")).toHaveAttribute("action", "/playground");
  });
});
