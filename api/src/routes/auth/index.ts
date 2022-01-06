import express from "express";

import { SetupRouterFunction } from "../../typings/setup-router";
import getRouterWrappers from "../route-wrapper";
import login from "./login";
import sendVerificationEmail from "./send-verification-email";
import signup from "./signup";
import verifyEmail from "./verify-email";

const setupAuthRouter: SetupRouterFunction = (config, services) => {
  const { unAuthWrapper, authWrapper } = getRouterWrappers(config, services);

  const router = express.Router();

  router.post("/auth/login", unAuthWrapper(login));
  router.post("/auth/signup", unAuthWrapper(signup));
  router.post(
    "/auth/send-verification-email",
    authWrapper(sendVerificationEmail)
  );
  router.post("/auth/verify-email", unAuthWrapper(verifyEmail));

  return router;
};

export default setupAuthRouter;
