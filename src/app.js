const express = require("express");
const router = express.Router();
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const pricingRoutes = require('./pricing-service/pricing.route');

require('dotenv').config();


const app = express();
app.use(express.urlencoded({extended: true}));

app.use(express.json())
app.use(cors())

app.use('/pricing', pricingRoutes);

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info:{
      title: 'Shuttlers API',
      desciption: 'Backend API for the Shuttlers Project ',
      contact: {
        name: 'Daposta',
        email: 'dapolawore@gmail.com'

      },  
    },
    servers:[
      {url:'http://localhost:3000', description: 'Local server'},
     
    ],
  },
   apis: [`${__dirname}/*/*.route.js`],

}
const specs = swaggerJsDoc(options);
app.use('/', swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }))

module.exports = app;