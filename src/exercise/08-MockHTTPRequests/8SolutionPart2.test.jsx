import * as React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import LoginSubmission from "../sharedComponent/LoginSubmission"; 
import '@testing-library/jest-dom';


const server = setupServer(
  rest.post("https://auth-provider.example.com/api/login", async (req, res, ctx) => {
    const { username, password } = await req.json();

    if (!username || !password) {
      return res(
        ctx.status(400),
        ctx.json({ message: "Username and password are required" })
      );
    }

    return res(ctx.json({ username }));
  })
);


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test("shows error message when missing password (snapshot)", async () => {
  render(<LoginSubmission />);

  await userEvent.type(screen.getByLabelText(/username/i), "santiago");
  await userEvent.click(screen.getByRole("button", { name:/submit/i }));

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  
  expect(screen.getByRole("alert")).toHaveTextContent(
    /username and password are required/i
  );
});