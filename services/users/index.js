const express = require("express");
const router = express.Router();
const me = require("./me");
const apartments = require("./apartments");
const validationMiddleware = require("../../middlewares/validation");
const routeMiddleware = require("../../middlewares/route");

router.get(
  "/me", 
  routeMiddleware(me.route),
  validationMiddleware("bodySchema", me.bodySchema)
);

router.get(
  "/apartments",
  routeMiddleware(apartments.route),
  validationMiddleware("paramsSchema", apartments.paramsSchema)
);

module.exports = router;