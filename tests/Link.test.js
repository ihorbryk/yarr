import React from "react";
import { RouterContext } from "../RouterContext";
import { Router } from "../Router";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Link } from "../Link";

it("Should display correct link text and route", () => {
  const HomeComponent = () => {
    return <Link to="helloworld">Hello world</Link>;
  };

  render(
    <Router
      routes={[{ name: "home", path: "/", component: <HomeComponent /> }]}
      initRouteName="home"
    />
  );

  expect(screen.getByRole("link")).toHaveTextContent("Hello world");
});

it("Should display message in console if used outside of router", () => {
  console.error = jest.fn();

  const HomeComponent = () => {
    return <Link to="helloworld">Hello world</Link>;
  };

  render(<HomeComponent />);

  // The first argument of the first call to the function was 'hello'
  expect(console.error.mock.calls[0][0]).toBe(
    "You should not use Link outside of Router"
  );
});

it("Should change current path after cilck on Link", () => {
  const HomeComponent = () => {
    return <Link to="/second">Hello world</Link>;
  };

  const SecondComponent = () => {
    return <div data-testid="second">Second page</div>;
  };

  render(
    <Router
      routes={[
        { name: "home", path: "/", component: <HomeComponent /> },
        { name: "second", path: "/second", component: <SecondComponent /> },
      ]}
      initRouteName="home"
    />
  );

  fireEvent.click(screen.getByRole("link"));

  expect(screen.getByTestId("second")).toHaveTextContent("Second page");
});
