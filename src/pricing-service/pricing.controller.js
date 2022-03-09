const {PRICING_STRATEGIES, FIXED_STRATEGY_COST, FLEXI_SCHEMA,
   ROUTES , MODULAR_ROUTES_PRICING} = require('./pricing.dto')

const { findRoute, findStrategy, distanceConverter}  = require('./pricing.utils');


const computeCost = (req, res) =>{
  console.log(req.params);
  const {routeId, start, end} = req.params;  
  const currentRoute = findRoute(Number(routeId)) //ROUTES[newRouteId].path //[routeId -1]

  if(!currentRoute) return res.status(400).json('Invalid route')
  const strategy = currentRoute.strategy;
  if (!currentRoute.path.includes(start) || !currentRoute.path.includes(end) || (start === end)){
    return res.status(400).json('Invalid routes sent')
  }
  if(currentRoute.strategy == 'FIXED'){
   
    const cost = FIXED_STRATEGY_COST
    return res.status(200).json(cost)
  }
  else if(currentRoute.strategy === 'FLEXI'){
    
    let distanceTravelled =  currentRoute.path.indexOf(end) - currentRoute.path.indexOf(start)
    if(distanceTravelled < 1) return res.status(200).json('There is an issue with the routes data')
    const latestFlexiConfig = FLEXI_SCHEMA[FLEXI_SCHEMA.length-1];
    distanceTravelled =  distanceConverter(latestFlexiConfig.unit, distanceTravelled + 1) 
    const currentPricePerKm = latestFlexiConfig.price;
    const cost = distanceTravelled * (currentPricePerKm);
    return res.status(200).json(cost)
  }
  else if(currentRoute.strategy === 'MODULAR'){
    let cost = 0;
    const routes = MODULAR_ROUTES_PRICING;
    const startIndex = routes.findIndex(item => item.name.includes(start))
    const endIndex = routes.findIndex(item => item.name.includes(end))
    for(i= startIndex; i <= endIndex; i++){
      cost = cost + routes[i].price
    }

    return res.status(200).json(cost)

  }
  else{
    return res.status(400).json('Pricing strategy not supported')
  }
}



const configureRouteStrategy = (req, res)=> {
  const {routeId} = req.params; 
  const {configuration} = req.body;
 
  const currentRoute = findRoute(Number(routeId)) 

  if(!currentRoute) return res.status(400).json('Invalid route')
  const strategy = findStrategy(configuration)
  if(!strategy){
    return res.status(400).json('Pricing strategy not supported. Options: FIXED|FLEXI|MODULAR')
  }
  const route = findRoute(Number(routeId))
  route.strategy = strategy
  res.status(200).json(route)
}




module.exports = {
  computeCost, configureRouteStrategy 
}