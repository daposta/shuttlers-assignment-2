const {PRICING_STRATEGIES, FIXED_STRATEGY_COST, FLEXI_SCHEMA,
   ROUTES , MODULAR_ROUTES_PRICING} = require('./pricing.dto')



const computeCost = (req, res) =>{
  
  const {routeId, start, end} = req.params;  
  const currentRoute = findRoute(Number(routeId)) //ROUTES[newRouteId].path //[routeId -1]
  console.log('ffff',currentRoute)
  const strategy = currentRoute.strategy;
  console.log(strategy)
  console.log('path...',currentRoute.path)
  if (!currentRoute.path.includes(start) || !currentRoute.path.includes(end) || (start === end)){
    return res.status(400).json('Invalid routes sent')
  }
  if(strategy == PRICING_STRATEGIES.FIXED){
   
    const cost = FIXED_STRATEGY_COST
    return res.status(200).json(cost)
  }
  else if(strategy === PRICING_STRATEGIES.FLEXI){
    
    let distanceTravelled =  currentRoute.path.indexOf(end) - currentRoute.path.indexOf(start)
    if(distanceTravelled < 1) return res.status(200).json('There is an issue with the routes data')
    const latestFlexiConfig = FLEXI_SCHEMA[FLEXI_SCHEMA.length-1];
    distanceTravelled =  distanceConverter(latestFlexiConfig.unit, distanceTravelled + 1) 
    const currentPricePerKm = latestFlexiConfig.price;
    const cost = distanceTravelled * (currentPricePerKm);
    return res.status(200).json(cost)
  }
  else if(strategy === PRICING_STRATEGIES.MODULAR){
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



const configurePricing = (req, res)=> {
  const {strategy} = ROUTES.strategy;
  if(strategy == PRICING_STRATEGIES.FIXED){
  }
  else if(strategy === PRICING_STRATEGIES.FLEXI){
    FLEXI_SCHEMA.push(req.body)
    return res.status(400).json(FLEXI_SCHEMA) 
  }else if(strategy === PRICING_STRATEGIES.MODULAR){
    MODULAR_ROUTES_PRICING.push(req.body)
  }
  else{
    return res.status(400).json('Pricing strategy not supported')
  }
}

const distanceConverter = (unit, distance) => {
  if(unit === 'km') {
    return distance
  }
  else{
    if(unit === 'm'){
      const convertedDistance = (distance * 1000);
      return convertedDistance
    }
    else{
      return 0
    }
  }
}

const findRoute = (routeId ) => {
  let route = {}
   ROUTES.map(element =>{
    if(element.id === routeId){
      route =  element;
      return;

    }
  } )
  console.log('route....', route);
  return route
}

module.exports = {
  computeCost, configurePricing
}