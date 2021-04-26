import express from 'express';
import path from 'path';
import logger from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';
import errorhandler from 'errorhandler';

const createError = require('http-errors');

// Initialize exress
const app = express();

// Environmental Configurations
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
  dotenv.config({
    path: path.resolve('./', `${process.env.NODE_ENV.trim()}.env`),
  });
} else {
  dotenv.config({
    path: path.resolve('./', `${process.env.NODE_ENV.trim()}.env`),
  });
}

// Swagger Definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Vending Machine API',
    version: '1.0.0',
    description: 'Vending Machine Backend',
    contact: {
      name: 'Kamlesh Katpara',
      email: 'mekamleshk@gmail.com',
    },
  },
  host: `localhost:${process.env.PORT}`,
  tags: [],
  servers: [
    {
      url: `http://${process.env.HOST}:${process.env.PORT}`,
    },
  ],
  basePath: '/',
};

// Inform swagger where to look for the swagger definitions
const options = {
  swaggerDefinition,
  apis: ['./src/features/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// To access the generated swagger json file on a endpoint
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));

// Using handlebars view engine
app.set('view engine', 'hbs');

// to compress the response body
app.use(compression());

// to secure the application
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", "'unsafe-inline'", 'localhost'],
      },
    },
  }),
);

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.disable('x-powered-by');

// Enable logger during development mode
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// The main route/endpoint
app.use('/', require('./features/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 500;
  // eslint-disable-next-line no-param-reassign
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
