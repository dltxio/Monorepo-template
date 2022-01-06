import * as uuid from "uuid";

import { AuthRequestHandler } from "../route-wrapper";

export const generateTokenAndSendEmail = async (
  user: data.User,
  services: Services,
  logger: core.backend.Logger
) => {
  const token = uuid.v4().replace(/-/g, "");

  //save it
  const [updatedUser] = await services.data.users.update(
    { userId: user.userId },
    { emailVerificationCode: token }
  );

  logger.debug(`${user.userId} emailVerificationCode added`);

  return services.email.sendEmailVerification(updatedUser);
};

const sendVerificationEmail: AuthRequestHandler<
  void,
  void,
  api.EmailVerificationBody,
  api.SuccessResponse
> = async ({ user, logger, services }) => {
  await generateTokenAndSendEmail(user, services, logger);
  return { success: true };
};

export default sendVerificationEmail;
