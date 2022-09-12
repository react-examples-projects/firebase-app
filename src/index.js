import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./Routers";
import UserSessionProvider from "./context/UserSessionProvider";
import { NextUIProvider, createTheme } from "@nextui-org/react";

import "./styles/index.css";
import "./styles/utils.css";
import "inter-ui/inter.css";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      black: "#010e1a",
    },
    fonts: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto","Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif',
    },
  },
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
