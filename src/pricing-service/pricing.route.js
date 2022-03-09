const express = require('express');
const { computeCost, configureRouteStrategy } = require('./pricing.controller');
const router = express.Router();

/**
*  @swagger
*   /pricing/pricingCost/{routeId}/{start}/{end}:
*      get:
*         summary: Get the cost of a trip
*         parameters:
*           - in: path 
*             name: routeId 
*             schema:
*               type: integer
*               description: Route ID
*               required: true
*           - in: path
*             name: start
*             schema:
*               type: string
*               description: Trip starting location
*           - in: path
*             name: end
*             schema:
*               type: string
*               description: Trip destination
*         responses:
*             '200':
*                 description: A successful response
*/
router.get('/pricingCost/:routeId/:start/:end', computeCost)

/**
*  @swagger
*   /pricing/configureRouteStrategy/{routeId}:
*      post:
*         summary: Set strategy for route
*         parameters:
*           - in: path
*             name: routeId
*             schema:
*               type: string
*               description: Route ID
*         requestBody:
*           required: true
*           content:
*             application/json:
*               schema:
*                  type: object
*                  properties:
*                    configuration:
*                       type: string
*               example:
*                 {
*                   configuration: 'FIXED'
*                 }
*         responses:
*             '200':
*                 description: A successful response
*/
router.post('/configureRouteStrategy/:routeId', configureRouteStrategy)


module.exports = router;

