const Joi = require("joi");
const ApartmentsController = require("../../controllers/apartments");

const paramsSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const apartmentSchema = Joi.object({
  address: Joi.string().required(),
  rentPrice: Joi.number().min(0).required(),
  salePrice: Joi.number().min(0).required(),
  bedrooms: Joi.number().integer().min(0).required(),
  hasGarage: Joi.boolean().required(),
  hasElevator: Joi.boolean().required(),
  isFurnished: Joi.boolean().required(),
});

const update = async (req, res) => {
  const { error, value } = apartmentSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const userId = req.user.id;

  const apartment = await ApartmentsController.getApartment(req.params.id);

  if (apartment.userId != userId) {
    return res.status(403).send({ message: "Forbidden" });
  }

  const { body } = req;
  body.userId = req.user.id;

  const result = await ApartmentsController.updateApartment(
    req.params.id,
    req.body
  );

  if (!result) {
    return res.status(404).send({ message: "Apartment not found" });
  }

  return res.status(200).send({ message: "Apartment updated" });
};

module.exports = update;
