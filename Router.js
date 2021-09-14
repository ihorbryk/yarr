import React from "react";
import { RouterContext } from "./RouterContext";

export const Router = (props) => {
  const [history, setHistory] = React.useState([]);
  const currentRoute = history[history.length - 1];

  const navigateToRoute = (route) => {
    if (route && route.name != currentRoute?.name) {
      setHistory([...history, route]);
    } else {
      throw "You try navigate to not exists route!";
    }
  };

  const navigateTo = (routeName) => {
    const route = props.routes.find((routeItem) => routeItem.name == routeName);
    navigateToRoute(route);
  };

  const navigateToPath = (path) => {
    const route = props.routes.find((routeItem) => routeItem.path == path);
    navigateToRoute(route);
  };

  React.useEffect(() => {
    if (props.initRouteName && currentRoute?.name != props.initRouteName) {
      navigateTo(props.initRouteName);
    } else {
      throw "Not provided init route";
    }
  }, []);

  const back = () => {
    setHistory((prew) => {
      if (prew.length > 1) {
        return prew.slice(0, -1);
      }

      return prew;
    });
  };

  return (
    <RouterContext.Provider
      value={{ currentRoute, navigateTo, navigateToPath, back }}
    >
      {currentRoute && currentRoute.component}
    </RouterContext.Provider>
  );
};
