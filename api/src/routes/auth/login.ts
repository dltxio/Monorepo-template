import Joi from "joi";

import { doesPasswordMatchHash, userToJWT } from "../../utils/auth";
import { notFound, validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
import { UnAuthRequestHandler } from "../route-wrapper";

const bodyValidation: ValidationSchema<api.LoginRequestBody> = {
  email: Joi.string().required(),
  password: Joi.string().required()
};

const login: UnAuthRequestHandler<
  void,
  void,
  api.LoginRequestBody,
  string
> = async ({ body, services }) => {
  body.email = body.email.toLowerCase();
  const bodyValidationResult = validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const user = await services.data.users.findOne({ email: body.email });

  if (!user) {
    return notFound("user");
  }

  const passwordMatchesHash = await doesPasswordMatchHash(
    body.password,
    user.password
  );

  if (!passwordMatchesHash) {
    return notFound("user");
  }

  if (!user.emailVerified) {
    return notFound("emailVerified");
  }

  return userToJWT(user, services.auth);
};

export default login;
