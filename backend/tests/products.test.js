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

describe('PUT /products - update an existing product', () => {
  it('should return the updated object', async (done) => {
    const data = {
      name: 'testing product one',
      price: 100,
      quantity: 20,
      image: '',
    };

    const response = await request(app).put('/products/28').send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('price');
    expect(response.body).toHaveProperty('quantity');
    expect(response.body).toHaveProperty('image');
    done();
  });
});

describe('POST /products - create a new product', () => {
  it('should return the created object', async (done) => {
    const data = {
      name: 'test product one',
      price: 10000,
      quantity: 2000,
      image: '',
    };

    const response = await request(app).post('/products').send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('price');
    expect(response.body).toHaveProperty('quantity');
    expect(response.body).toHaveProperty('image');
    done();
  });
});

describe('GET /products - get all products', () => {
  it('should return JSON array', async (done) => {
    const response = await request(app).get('/products');
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('price');
    expect(response.body[0]).toHaveProperty('quantity');
    expect(response.body[0]).toHaveProperty('image');
    expect(response.statusCode).toBe(200);
    done();
  });
});
