import React from "react";
import ReactDOM from "react-dom/client";
import UserSessionProvider from "./context/UserSessionProvider";
import { NextUIProvider, createTheme } from "@nextui-org/react";

import "./styles/index.css";
import "./styles/utils.css";
import Routers from "./Routers";

const darkTheme = createTheme({
  type: "dark",
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <NextUIProvider theme={darkTheme}>
      <UserSessionProvider>
        <Routers />
      </UserSessionProvider>
    </NextUIProvider>
  </React.StrictMode>
);
