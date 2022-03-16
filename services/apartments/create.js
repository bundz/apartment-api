const Joi = require("joi");
const ApartmentsController = require("../../controllers/apartments");

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
  // const { error, value } = apartmentSchema.validate(req.body);

  // if (error) {
  //   return res.status(400).send(error);
  // }

  const { body } = req;
  body.userId = req.user.id;

  const insertedId = await ApartmentsController.insertApartment(body);

  return res.status(200).send({
    success: insertedId,
  });
};

module.exports = { route, bodySchema };
