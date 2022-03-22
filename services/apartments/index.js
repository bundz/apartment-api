const express = require("express");
const router = express.Router();
const create = require("./create");
const deleteData = require("./delete");
const update = require("./update");
const getElement = require("./getElement");
const getObject = require("./getObject");
const authenticationMiddleware = require("../../middlewares/authentication");
const validationMiddleware = require("../../middlewares/validation");
const routeMiddleware = require("../../middlewares/route");

router.post(
  "/",
  authenticationMiddleware,
  validationMiddleware({ bodySchema: create.bodySchema }),
  routeMiddleware(create.route)
);

router.get(
  "/:id",
  validationMiddleware({paramsSchema: getElement.paramsSchema}),
  routeMiddleware(getElement.route)
);

router.get(
  "/", 
  validationMiddleware({querySchema: getObject.listQuerySchema}),
  routeMiddleware(getObject.route)
);

router.patch(
  "/:id",
  authenticationMiddleware,
  validationMiddleware({paramsSchema: update.paramsSchema, bodySchema: update.bodySchema}),
  routeMiddleware(update.route)
);

router.delete(
  "/:id",
  authenticationMiddleware,
  validationMiddleware({ paramsSchema: deleteData.paramsSchema }),
  routeMiddleware(deleteData.route)
);

module.exports = router;
