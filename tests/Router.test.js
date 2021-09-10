import React from "react";
import { RouterContext } from "../RouterContext";
import { Router } from "../Router";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

it("Should render component if current path equal to ruote", () => {
  const HomeComponent = () => {
    return <div data-testid="homepage">Home page</div>;
  };

  render(
    <Router
      routes={[{ name: "home", path: "/", component: <HomeComponent /> }]}
      initRouteName="home"
    />
  );

  expect(screen.getByTestId("homepage")).toHaveTextContent("Home page");
});

it("Should render next component after invoke navigateTo exist route", () => {
  const HomePage = () => {
    const routerContext = React.useContext(RouterContext);

    React.useEffect(() => {
      routerContext.navigateTo("second");
    }, []);

    return <div data-testid="homepage">Home page</div>;
  };

  const SecondPage = () => {
    return <div data-testid="secondpage">Second page</div>;
  };

  render(
    <Router
      routes={[
        { name: "home", path: "/", component: <HomePage /> },
        { name: "second", path: "/second", component: <SecondPage /> },
      ]}
      initRouteName="home"
    />
  );

  expect(screen.getByTestId("secondpage")).toHaveTextContent("Second page");
});

it("Should render prew component after invoke back method", async () => {
  const HomePage = () => {
    const routerContext = React.useContext(RouterContext);
    return (
      <div
        data-testid="homepage"
        onClick={() => routerContext.navigateTo("second")}
      >
        Home page
      </div>
    );
  };

  const SecondPage = () => {
    const routerContext = React.useContext(RouterContext);
    return (
      <div data-testid="secondpage" onClick={() => routerContext.back()}>
        Second page
      </div>
    );
  };

  render(
    <Router
      routes={[
        { name: "home", path: "/", component: <HomePage /> },
        { name: "second", path: "/second", component: <SecondPage /> },
      ]}
      initRouteName="home"
    />
  );

  fireEvent.click(screen.getByTestId("homepage"));
  fireEvent.click(screen.getByTestId("secondpage"));

  expect(screen.getByTestId("homepage")).toHaveTextContent("Home page");
});

it("Should throw exception when try to navigate to non exists route", () => {
  const HomePage = () => {
    const routerContext = React.useContext(RouterContext);

    React.useEffect(() => {
      routerContext.navigateTo("second");
    }, []);

    return <div data-testid="homepage">Home page</div>;
  };

  const renderRouter = () => {
    render(
      <Router
        routes={[{ name: "home", path: "/", component: <HomePage /> }]}
        initRouteName="home"
      />
    );
  };

  expect(renderRouter).toThrowError("You try navigate to not exists route!");
});

it("Should render current compoent if invoke back with history by one element", async () => {
  const HomePage = () => {
    const routerContext = React.useContext(RouterContext);
    return (
      <div data-testid="homepage" onClick={() => routerContext.back()}>
        Home page
      </div>
    );
  };

  render(
    <Router
      routes={[{ name: "home", path: "/", component: <HomePage /> }]}
      initRouteName="home"
    />
  );

  fireEvent.click(screen.getByTestId("homepage"));

  expect(screen.getByTestId("homepage")).toHaveTextContent("Home page");
});

it("Should throw exception if no initRouteName", () => {
  const renderRouter = () => {
    render(
      <Router
        routes={[
          { name: "home", path: "/", component: <div>Hello world</div> },
        ]}
      />
    );
  };

  expect(renderRouter).toThrowError("Not provided init route");
});
