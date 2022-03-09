const request = require('supertest')
const app = require('../app');

describe('Compute Cost', () => {
  test("It should response the GET method", async () => {
    const start = 'A'
    const end = 'E'
    const routeId = 1
    const response = await request(app).get(`/pricing/pricingCost/${routeId}/${start}/${end}`);
    expect(response.statusCode).toBe(200);
    // expect(response.statusCode).toBe(200);
    // expect(response.statusCode).toBe(200);
  });
})

describe('Set Route Strategy', () => {
  test("It should response the POST method", async () => {
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