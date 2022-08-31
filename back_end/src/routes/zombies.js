const express = require('express');
const { updatePosition } = require('../controllers/zombies');
const checkInput = require('../middleware/checkInput');

const router = express.Router();

router.put('/', checkInput, updatePosition);
module.exports = router;
