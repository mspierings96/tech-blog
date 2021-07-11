const router = require("express").Router();

const apiRoutes = require("./api/");
const pageroutes = require("./page-routes.js");
// const dashboardRoutes = require("./dashboard-routes.js");

router.use("/", pageroutes);
// router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
