const ROUTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const PRICING_STRATEGIES = {'FIXED':'FIXED', 'FLEXI': 'FLEXI', 'MODULAR': 'MODULAR'}
const FIXED_STRATEGY_COST = 100
const FLEXI_SCHEMA = [
  {'price': 200, 'distance': 1, 'unit': 'km'},
  {'price': 100, 'distance': 10, 'unit': 'm'}
]
const MODULAR_ROUTES_PRICING = [
  {'name':['A', 'B'], 'price':50},
  {'name': ['C', 'D'], 'price':50},
  {'name': ['E', 'F', 'G'], 'price':10}
]
const ROUTE_COST = 500



module.exports = {
ROUTES, PRICING_STRATEGIES, FIXED_STRATEGY_COST, FLEXI_SCHEMA, 
MODULAR_ROUTES_PRICING
}