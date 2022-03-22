const Joi = require("joi");
const ApartmentsController = require("../../controllers/apartments");
const ApiError = require("../../utils/apiError");

const paramsSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const route =  async (req, res) => {

    const result = await ApartmentsController.getApartment(req.params.id);

    if ( !result ) {
        throw ApiError.NotFound("Apartment not found.", {});
    }

    return res.status(200).send({ ElementFound: result });
};

module.exports = {route, paramsSchema};