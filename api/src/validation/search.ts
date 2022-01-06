import Joi from "joi";

import { ValidationSchema } from "../utils/validate";

export const paginationValidation: ValidationSchema<api.PaginationQuery> = {
  page: Joi.string(),
  pageSize: Joi.string()
};
