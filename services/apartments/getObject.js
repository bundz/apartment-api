const Joi = require("joi");
const ApartmentsController = require("../../controllers/apartments");

const listQuerySchema = Joi.object({
    hasGarage: Joi.boolean(),
    hasElevator: Joi.boolean(),
    isFurnished: Joi.boolean(),
    rentPriceLessThan: Joi.number().min(0).integer(),
    rentPriceGreaterThan: Joi.number().min(0).integer(),
    salePriceLessThan: Joi.number().min(0).integer(),
    salePriceGreaterThan: Joi.number().min(0).integer(),
    beedroomsAtLeast: Joi.number().min(1).integer(),
    searchAddress: Joi.string()
});

const getObject =  async (req, res) => {
    const { error, value } = listQuerySchema.validate(req.params);

    if (error) {
        return res.status(400).send(error);
    }

    const result = await ApartmentsController.getApartments(req.params);

    return res.status(200).send({ ElementsFound: result });
};

module.exports = getObject;