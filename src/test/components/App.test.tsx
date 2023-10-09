import { screen, waitFor } from "@testing-library/react";

import App from "../../App";
import appRender from "./appRender";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { productsData } from "../productsData";

export const handlers = [
  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(ctx.json(productsData), ctx.delay(150));
  }),
  rest.get("https://api.escuelajs.co/api/v1/auth/profile", (req, res, ctx) => {
    return res(ctx.json({}), ctx.delay(150));
  }),
];

const productServer = setupServer(...handlers);

beforeAll(() => productServer.listen());
afterEach(() => productServer.resetHandlers());
afterAll(() => productServer.close());

describe("Test App component", () => {
  test("Should layout match snapshot", async () => {
    //const { baseElement } = appRender(<App />);
    // expect(baseElement).toMatchSnapshot();
    await waitFor(() => screen.findAllByText(/Logo/i));
    expect(screen.getAllByText(/Logo/i).length).toBe(1);
  });
});
