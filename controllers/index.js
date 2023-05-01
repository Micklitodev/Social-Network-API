const router = require('express').Router();
const userRoutes = require('./api/user');

router.use('/api', userRoutes)

module.exports = router;