const express = require('express');
const { computeCost } = require('./pricing.controller');
const router = express.Router();

router.get('/pricingCost/:routeId/:start/:end', computeCost)

router.get('/configurePricing/:routeId', computeCost)


module.exports = router;

