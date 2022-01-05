import express from "express";

import { SetupRouterFunction } from "../../typings/setup-router";
import getRouterWrappers from "../route-wrapper";
import getMe from "./get-me";

const setupUserRouter: SetupRouterFunction = (config, services) => {
  const { authWrapper } = getRouterWrappers(config, services);

  const router = express.Router();
  router.get("/user", authWrapper(getMe));
  return router;
};

export default setupUserRouter;
