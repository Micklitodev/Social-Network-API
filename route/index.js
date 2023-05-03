const router = require("express").Router();
const userRoutes = require("./api/user");
const thoughtRoutes = require("./api/thought");

router.use("/api", userRoutes);

router.use("/api", thoughtRoutes);

module.exports = router;
