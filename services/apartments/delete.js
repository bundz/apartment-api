const Joi = require("joi");
const ApartmentsController = require("../../controllers/apartments");

const paramsSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const route = async (req, res) => {
  const userId = req.user.id;
  const apartment = await ApartmentsController.getApartment(req.params.id);

  if (apartment.userId != userId) {
    return res.status(403).send({ message: "Forbidden" });
  }

  await ApartmentsController.deleteApartment(req.params.id);

  return res.status(200).send({ message: "Apartment deleted" });
};

module.exports = {
  route,
  paramsSchema,
};
