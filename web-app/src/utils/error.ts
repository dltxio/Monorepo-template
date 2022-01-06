export const getApiError = (error: any): api.ErrorResponse | undefined => {
  if (!error.statusCode) {
    return undefined;
  }

  return error as api.ErrorResponse;
};
