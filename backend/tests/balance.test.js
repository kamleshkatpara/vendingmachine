/* eslint-disable no-undef */
import request from 'supertest';
import chalk from 'chalk';
import app from '../src/app';
import server from '../src/bin/www';
import dbConn from '../src/bin/db';

const error = chalk.bold.yellow;

afterAll(async (done) => {
  // eslint-disable-next-line no-console
  await dbConn.end(() => console.log(error('MySQL connection was closed')));
  await server.close();
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  done();
});

describe('PUT /balance - update an existing balance', () => {
  it('should return the updated object', async (done) => {
    const data = {
      amount: 100,
    };

    const response = await request(app).put('/balance/28').send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('amount');
    done();
  });
});

describe('POST /balance - create a new balance', () => {
  it('should return the created object', async (done) => {
    const data = {
      amount: 10,
    };
    const response = await request(app).post('/balance').send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('amount');
    done();
  });
});

describe('GET /balance - get current balance', () => {
  it('should return object', async (done) => {
    const response = await request(app).get('/balance');
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('amount');
    expect(response.statusCode).toBe(200);
    done();
  });
});
