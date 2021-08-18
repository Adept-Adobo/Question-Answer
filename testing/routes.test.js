const request = require('supertest');
const index = require('../server/index');
const pool = require('../server/db');

afterAll(() => {
  pool.end();
});

describe('Test the questions route', () => {
  test('response to GET method for questions should be 200', (done) => {
    request(index)
      .get('http://localhost3000/qa/questions/10')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
