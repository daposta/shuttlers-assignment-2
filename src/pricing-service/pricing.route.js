const express = require('express');
const { computeCost, configureRouteStrategy } = require('./pricing.controller');
const router = express.Router();

router.get('/pricingCost/:routeId/:start/:end', computeCost)

router.post('/configureRouteStrategy/:routeId', configureRouteStrategy)


module.exports = router;

