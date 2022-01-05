export const badRequest = (
  code: api.BadRequestCode,
  message: string
): api.BadRequestGeneralResponse => ({
  statusCode: 400,
  reason: "bad_request",
  type: "general",
  message,
  code
});

export const validationBadRequest = (
  errors: api.ValidationError[]
): api.BadRequestValidationResponse => ({
  statusCode: 400,
  reason: "bad_request",
  type: "validation",
  message: "Request had validation errors",
  validationErrors: errors
});

export const notFound = (resource: string): api.NotFoundResponse => ({
  statusCode: 404,
  reason: "not_found",
  resource,
  message: "Resource could not be found."
});

export const notAuthorized = () =>
  error(
    401,
    "unauthorized",
    "This route requires authentication. Token may be invalid."
  );

export const forbidden = () =>
  error(403, "forbidden", "You do not have permission.");

const error = (
  statusCode: number,
  reason: api.GeneralApiErrorResponseReasonType,
  message: string
): api.ErrorResponse => ({
  statusCode,
  reason,
  message
});
