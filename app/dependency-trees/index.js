const express = require('express');
const controller = require('./controller');

const router = new express.Router();

router.get('/', controller.index);
router.get('/:packageName', controller.show);

module.exports = router;
