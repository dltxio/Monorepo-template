import Joi from "joi";

import { userSerialiser } from "../../serialisers/user";
import { forbidden, notFound, validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
import { UnAuthRequestHandler } from "../route-wrapper";

const bodyValidation: ValidationSchema<api.EmailVerificationBody> = {
  email: Joi.string().required(),
  token: Joi.string().required()
};

const verifyEmail: UnAuthRequestHandler<
  void,
  void,
  api.EmailVerificationBody,
  api.User
> = async ({ body, services }) => {
  const bodyValidationResult = validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const user = await services.data.users.findOne({
    email: body.email.toLowerCase()
  });

  if (!user) {
    return notFound("user");
  }

  if (user.emailVerificationCode !== body.token) {
    return forbidden();
  }

  const [updatedUser] = await services.data.users.update(
    { userId: user.userId },
    { emailVerified: true }
  );

  return userSerialiser(updatedUser);
};

export default verifyEmail;
