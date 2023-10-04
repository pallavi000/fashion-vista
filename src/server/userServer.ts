import { rest } from "msw";
import { setupServer } from "msw/node";
import { userData } from "../test/testData/userData";

export const handlers = [
  rest.get("https://api.escuelajs.co/api/v1/users", async (req, res, ctx) => {
    return res(ctx.json(userData));
  }),
];

const userServer = setupServer(...handlers);

export default userServer;
