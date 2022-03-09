const express = require("express");
const router = express.Router();
const cors = require('cors');
const pricingRoutes = require('./pricing-service/pricing.route');

require('dotenv').config();


const app = express();
app.use(express.urlencoded({extended: true}));

app.use(express.json())
app.use(cors())

app.use('/pricing', pricingRoutes);


module.exports = app;