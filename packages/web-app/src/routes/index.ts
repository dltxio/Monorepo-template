import { lazy } from "react";

import Page404 from "../pages/404";
import Blank from "../pages/Blank";
import Buttons from "../pages/Buttons";
import Cards from "../pages/Cards";
import Charts from "../pages/Charts";
import Community from "../pages/Community";
// Use lazy for better code splitting, a.k.a. load faster
// const Dashboard = lazy(async () => '../pages/Dashboard'));
// const Forms = lazy(async () => '../pages/Forms'));
// const Cards = lazy(async () => '../pages/Cards'));
// const Charts = lazy(async () => '../pages/Charts'));
// const Buttons = lazy(async () => '../pages/Buttons'));
// const Modals = lazy(async () => '../pages/Modals'));
// const Tables = lazy(async () => '../pages/Tables'));
// const page404 = lazy(async () => '../pages/404'));
// const Blank = lazy(async () => '../pages/Blank'));
import Dashboard from "../pages/Dashboard";
import Forms from "../pages/Forms";
import Modals from "../pages/Modals";
import Tables from "../pages/Tables";
import Wallets from "../pages/Wallets";

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // The url
    component: Dashboard // View rendered
  },
  {
    path: "/forms",
    component: Forms
  },
  {
    path: "/cards",
    component: Cards
  },
  {
    path: "/charts",
    component: Charts
  },
  {
    path: "/community",
    component: Community
  },
  {
    path: "/buttons",
    component: Buttons
  },
  {
    path: "/modals",
    component: Modals
  },
  {
    path: "/tables",
    component: Tables
  },
  {
    path: "/404",
    component: Page404
  },
  {
    path: "/blank",
    component: Blank
  },
  {
    path: "/wallets",
    component: Wallets
  }
];

export default routes;
