import express from 'express';

const router = express.Router();

/**
 * @openapi
 * components:
 *  schemas:
 *    PingResponse:
 *     type: object
 *     title: PingResponse
 *     properties:
 *        greeting:
 *           type: string
 *        date:
 *           type: string
 *        url:
 *           type: string
 *        headers:
 *           type: object
 *           properties:
 *              Content-Type:
 *                  type: string
 *           additionalProperties: true
 */

/**
 * @openapi
 * /ping:
 *   get:
 *     tags:
 *       - Ping
 *     responses:
 *       200:
 *         description: Ping Response
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/PingResponse'
 */
router.get('/ping', (req, res) => {
  res.json({
    greeting: 'Welcome to Vending Machine Backend Ping Service',
    date: new Date(),
    url: '/ping',
    headers: res.getHeaders(),
  });
});

router.get('/', (req, res) => {
  res.json({
    greeting: 'Welcome to Vending Machine Backend Service HomePage',
    date: new Date(),
    url: '/',
    headers: res.getHeaders(),
  });
});

// Other routes

router.use('/products', require('./products'));

router.use('/purchasedproducts', require('./purchasedproducts'));

router.use('/balance', require('./balance'));

module.exports = router;
