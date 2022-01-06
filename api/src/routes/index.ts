import express from "express";

import { SetupRouterFunction } from "../typings/setup-router";
import { notFound } from "../utils/errors";
import auth from "./auth";
import getRouterWrappers from "./route-wrapper";
import user from "./user";

export default (
  config: Config,
  services: (logger: core.backend.Logger) => Services
): express.Router => {
  const router = express.Router();

  // Ensure catchAll is always last
  const subRouters: SetupRouterFunction[] = [auth, ping, user, catchAll];

  for (const sr of subRouters) {
    router.use(sr(config, services));
  }

  return router;
};

const ping: SetupRouterFunction = (config, services) => {
  const { unAuthWrapper } = getRouterWrappers(config, services);

  const router = express.Router();

  router.get(
    "/ping",
    unAuthWrapper(async () => Promise.resolve({ online: true }))
  );

  return router;
};

const catchAll: SetupRouterFunction = (config, services) => {
  const { unAuthWrapper } = getRouterWrappers(config, services);

  const router = express.Router();

  router.use(
    "*",
    unAuthWrapper(async () => Promise.resolve(notFound("route")))
  );

  return router;
};
