import express from 'express';
import Product from './model';

const router = express.Router();

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     operationId: replaceById
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     requestBody:
 *        content:
 *            application/json:
 *                schema:
 *                    $ref: '#/components/schemas/NewProduct'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: Products PUT success
 */

// eslint-disable-next-line consistent-return
router.put('/:id', (req, res) => {
  if (typeof req.params.id !== 'string') {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: 'Error',
        message: `id property (id) cannot be updated from ${
          req.params.id
        } to ${typeof req.params.id}`,
        code: 'ENTITY_ID_NOT_FOUND',
      },
    });
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: 'Bad Request',
        message: 'Entity body missing: Product body data can not be empty',
        code: 'ENTITY_BODY_MISSING',
      },
    });
  }
  Product.update(
    req.params.id,
    new Product(req.body),
    // eslint-disable-next-line no-unused-vars
    (error, product) => {
      if (error) {
        res.send({
          error: {
            statusCode: 500,
            name: 'Server Error',
            message:
              error.message
              || `Error updating Product with id ${req.params.id}`,
            code: 'SOMETHING_WENT_WRONG',
          },
        });
      }
      res.json({
        id: req.params.id,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.body.image,
      });
    },
  );
});

/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/NewProduct'
 *     responses:
 *      200:
 *         description: Product model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewProduct'
 */

// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: 'Bad Request',
          message: 'Entity body missing: Product body data can not be empty',
          code: 'ENTITY_BODY_MISSING',
        },
      });
    }

    const newproduct = new Product(req.body);

    Product.create(newproduct, (error, id) => {
      if (error) {
        res.send({
          error: {
            statusCode: 500,
            name: 'Server Error',
            message: error.message || 'Error creating product',
            code: 'SOMETHING_WENT_WRONG',
          },
        });
      }

      newproduct.id = id;
      res.json(newproduct);
    });
  } catch (error) {
    res.send({
      error: {
        statusCode: 500,
        name: 'Server Error',
        message: error.message || 'Error creating product',
        code: 'SOMETHING_WENT_WRONG',
      },
    });
  }
});

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     operationId: find
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of Product model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/NewProduct'
 */
router.get('/', (req, res) => {
  Product.findAll((error, products) => {
    if (error) {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: 'Server Error',
          message:
            error.message || 'Some error occurred while retrieving products.',
          code: 'SOMETHING_WENT_WRONG',
        },
      });
    }
    res.status(200).send(products);
  });
});

module.exports = router;
