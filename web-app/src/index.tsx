import "./assets/css/tailwind.output.css";

import React from "react";
import { Suspense } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Windmill } from "./components";
import ThemedSuspense from "./components/dashboard/ThemedSuspense";
import { SidebarProvider } from "./context/SidebarContext";
import * as serviceWorker from "./serviceWorker";

// If (process.env.NODE_ENV !== 'production') {
//   const axe = require('react-axe')
//   axe(React, ReactDOM, 1000)
// }

ReactDOM.render(
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill usePreferences>
        <App />
      </Windmill>
    </Suspense>
  </SidebarProvider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({});
