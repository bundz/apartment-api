const { query } = require("express");
const ApiError = require("../utils/apiError");

const validate = (schema, data) => {
  const { error, value } = schema.validate(data);

  if (error) {
    throw error;
  }

  return value;
};

const validationMiddleware = ({ bodySchema, paramsSchema, querySchema }) => {
  return (req, res, next) => {
    try {
      if (bodySchema) {
        req.body = validate(bodySchema, req.body);
      }

      if (paramsSchema) {
        req.params = validate(paramsSchema, req.params);
      }

      if (querySchema) {
        req.body = validate(querySchema, req.body);
      }

      return next();
    } catch (error) {
      throw ApiError.badRequest("Invalid Schema.", {});
    }
  };
};

module.exports = validationMiddleware;
