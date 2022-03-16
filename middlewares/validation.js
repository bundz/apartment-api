const validate = (schema, data) => {
  const { error, value } = schema.validate(data);

  if (error) {
    throw error;
  }

  return value;
};

const validationMiddleware = ({ bodySchema, paramsSchema }) => {
  return (req, res, next) => {
    try {
      if (bodySchema) {
        req.body = validate(bodySchema, req.body);
      }

      if (paramsSchema) {
        req.params = validate(paramsSchema, req.params);
      }

      return next();
    } catch (error) {
      return res.status(400).send(error);
    }
  };
};

module.exports = validationMiddleware;
