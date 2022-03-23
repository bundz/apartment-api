const Joi = require("joi");
const UsersController = require("../../controllers/users");
const ApiError = require("../../utils/apiError");

const bodySchema = Joi.object({
  email: Joi.string().email().required(),
});

const route = async ( req, res ) => {
  const result = await UsersController.getByEmail(req.body.email);

  if (!result) {
    throw new ApiError.NotFound("Email not found.", {});
  }

  return res.status(200).send({userData: result});
}

module.exports = { route, bodySchema };