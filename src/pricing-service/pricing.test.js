const request = require('supertest')
const app = require('../app');

describe('Compute Cost', () => {
  test("It should return the cost of the trip", async () => {
    const start = 'A'
    const end = 'E'
    const routeId = 1
    const response = await request(app).get(`/pricing/pricingCost/${routeId}/${start}/${end}`);
    expect(response.statusCode).toBe(200);
    // expect(response.statusCode).toBe(200);
    // expect(response.statusCode).toBe(200);
  });
  test("It should fail to compute trip for an invalid route", async () => {
    const start = 'A'
    const end = 'E'
    const routeId = 100
    const response = await request(app).get(`/pricing/pricingCost/${routeId}/${start}/${end}`);
    expect(response.statusCode).toBe(400);
    // expect(response.statusCode).toBe(200);
    // expect(response.statusCode).toBe(200);
  });
})

describe('Set Route Strategy', () => {
  test("It updated the route configuration", async () => {
    const routeId = 1
    const response = await request(app)
    .post(`/pricing/configureRouteStrategy/${routeId}`)
    .send({
      "configuration": "MODULAR"
    });
    expect(response.statusCode).toBe(200);
    // expect(response.statusCode).toBe(200);
    // expect(response.statusCode).toBe(200);
  });
})