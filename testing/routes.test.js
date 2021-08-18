const request = require('supertest');
const app = require('../server/app');
const pool = require('../server/db');

afterAll(() => {
  pool.end();
});

describe('Test the questions route', () => {
  test('response to GET method for questions should be 200', (done) => {
    request(app)
      .get('/qa/questions/10')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('response to get method with invalid querries should still be 200', (done) => {
    request(app)
      .get('/qa/questions/-1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
