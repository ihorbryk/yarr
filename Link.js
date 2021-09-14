import React from "react";
import { RouterContext } from "./RouterContext";

export function Link(props) {
  const routerContext = React.useContext(RouterContext);

  if (!routerContext) {
    console.error("You should not use Link outside of Router");
  }

  const handleClickOnLink = (e) => {
    e.preventDefault();
    routerContext.navigateToPath(props.to);
  };

  return (
    <a href={props.to} onClick={handleClickOnLink}>
      {props.children}
    </a>
  );
}
