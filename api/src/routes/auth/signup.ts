import Joi from "joi";
import owasp from "owasp-password-strength-test";

import { hashPassword, userToJWT } from "../../utils/auth";
import { badRequest, validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
import { UnAuthRequestHandler } from "../route-wrapper";
import { generateTokenAndSendEmail } from "./send-verification-email";

const bodyValidation: ValidationSchema<api.SignupRequestBody> = {
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  address1: Joi.string().required(),
  address2: Joi.string().allow(""),
  state: Joi.string().required(),
  postCode: Joi.string().required()
};

const signup: UnAuthRequestHandler<
  void,
  void,
  api.SignupRequestBody,
  string
> = async ({ body, services, logger, config }) => {
  const bodyValidationResult = validate(body, bodyValidation);

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const pwValidation = owasp.test(body.password);
  if (!pwValidation.strong) {
    console.log("Your password is not strong enough.", pwValidation.errors);
    return badRequest("WEAK_PASSWORD", pwValidation.errors);
  }

  const existingUser = await services.data.users.findOne({ email: body.email });

  if (existingUser) {
    return badRequest(
      "EMAIL_IN_USE",
      "This email is already in use. Please use a different one."
    );
  }

  const password = await hashPassword(body.password, config.bcryptSaltRounds);

  const newUser = await services.data.users.create({
    email: body.email,
    password,
    firstName: body.firstName,
    lastName: body.lastName
  });

  if (body.postCode && body.address1) {
    await services.data.addresses.create({
      userId: newUser.userId,
      address1: body.address1,
      address2: body?.address2,
      state: body.state,
      postCode: body.postCode
    });
  }

  await generateTokenAndSendEmail(newUser, services, logger);

  return userToJWT(newUser, services.auth);
};

export default signup;
