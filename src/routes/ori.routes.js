const express = require('express');
const oriController = require('../controllers/ori.controller');

const router = express.Router();

router.post('/', oriController.create.bind(oriController));
router.get('/', oriController.getAll.bind(oriController));
router.get('/:id', oriController.getById.bind(oriController));
router.put('/:id', oriController.update.bind(oriController));
router.delete('/:id', oriController.delete.bind(oriController));

module.exports = router;
