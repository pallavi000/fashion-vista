import { screen } from "@testing-library/react";

import customRender from "../../utils/customRender";
import Navbar from "../../components/layout/Navbar";

describe("test the navbar component", () => {
  test("render a navbar button", async () => {
    customRender(<Navbar />);
    const buttonList = screen.getAllByRole("button");
    expect(buttonList).toBe(2);
  });
});
