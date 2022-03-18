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
  create.route
);

router.get("/:id", getElement);
router.get("/", getObject);
router.patch("/:id", authenticationMiddleware, update);

router.delete(
  "/:id",
  authenticationMiddleware,
  validationMiddleware({ paramsSchema: deleteData.paramsSchema }),
  routeMiddleware(deleteData.route)
);

module.exports = router;
