const express = require('express');
const oriRoutes = require('./ori.routes');

const router = express.Router();

router.use('/ori', oriRoutes);

module.exports = router;
