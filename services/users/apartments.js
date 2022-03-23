const Joi = require("joi");
const UsersController = require("../../controllers/users");
const ApiError = require("../../utils/apiError");
const jwt = require("jsonwebtoken");

const paramsSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const route = async (req, res) => {

  const tokenData = req.headers.authorization;

  const token = tokenData.split(" ")[1];

  const decoded = jwt.verify(token, "s3cr3t");

  req.user = decoded; 

  const result = await UsersController.getUserApartments(decoded.id);

  if (!result) {
    throw new ApiError.NotFound("", {});
  }

  res.status(200).send({userApartments: result})
}

module.exports = { route, paramsSchema };