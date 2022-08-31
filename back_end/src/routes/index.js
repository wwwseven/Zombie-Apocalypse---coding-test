const express = require('express');
const zombiesRoute = require('./zombies');
const router = express.Router();

router.use('/zombies', zombiesRoute);

module.exports = router;
