const {PRICING_STRATEGIES, ROUTES } = require('./pricing.dto')

const findStrategy = (config) => {
  let strategy ;
  PRICING_STRATEGIES.map(element => {
    if(element.name ===  config){
      strategy = config;
      return;
    }
  })
  return strategy;

}

const findRoute = (routeId ) => {
  let route;
   ROUTES.map(element =>{
    if(element.id === routeId){
      route =  element;
      return;
    }
   })

  return route
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

module.exports = {
  findStrategy, findRoute, distanceConverter
}