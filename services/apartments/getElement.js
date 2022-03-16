const Joi = require("joi");
const ApartmentsController = require("../../controllers/apartments");

const paramsSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const getElement =  async (req, res) => {
    const { error, value } = paramsSchema.validate(req.params);

    if (error) {
        return res.status(400).send(error);
    }

    const result = await ApartmentsController.getApartment(req.params.id);

    if ( !result ) {
        return res.status(404).send({ error : "Element not found" });
    }

    return res.status(200).send({ ElementFound: result });
};

module.exports = getElement;