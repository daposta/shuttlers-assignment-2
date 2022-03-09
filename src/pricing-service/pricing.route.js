const express = require('express');
const { computeCost, configurePricing } = require('./pricing.controller');
const router = express.Router();

router.get('/pricingCost/:routeId/:start/:end', computeCost)

router.post('/configurePricing/:routeId', configurePricing)


module.exports = router;

