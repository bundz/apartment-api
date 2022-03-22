const Joi = require("joi");
const ApartmentsController = require("../../controllers/apartments");
const ApiError = require("../../utils/apiError");

const paramsSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const bodySchema = Joi.object({
  address: Joi.string().required(),
  rentPrice: Joi.number().min(0).required(),
  salePrice: Joi.number().min(0).required(),
  bedrooms: Joi.number().integer().min(0).required(),
  hasGarage: Joi.boolean().required(),
  hasElevator: Joi.boolean().required(),
  isFurnished: Joi.boolean().required(),
});

const route = async (req, res) => {

  const userId = req.user.id;

  const apartment = await ApartmentsController.getApartment(req.params.id);

  if (!apartment) {
    throw ApiError.NotFound("This apartment doesn't exist.", {}); 
  }

  if (apartment.userId != userId) {
    throw ApiError.Forbidden("User doesn't own this apartment.", {});
  }

  const { body } = req;
  body.userId = req.user.id;

  await ApartmentsController.updateApartment(
    req.params.id,
    req.body
  );
  

  return res.status(200).send({ message: "Apartment updated" });
};

module.exports = {route, paramsSchema, bodySchema};
