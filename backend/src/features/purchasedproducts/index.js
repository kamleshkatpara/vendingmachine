import express from 'express';
import PurchasedProducts from './model';

const router = express.Router();

/**
 * @swagger
 * /purchasedproducts/{id}:
 *   put:
 *     tags:
 *       - PurchasedProducts
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
 *                    $ref: '#/components/schemas/NewPurchasedProduct'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: PurchasedProducts PUT success
 */

// eslint-disable-next-line consistent-return
router.put('/:id', (req, res) => {
  if (typeof req.params.id !== 'string') {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: 'Error',
        message: `id property (id) cannot be updated from ${req.params.id
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
        message:
          'Entity body missing: PurchasedProduct body data can not be empty',
        code: 'ENTITY_BODY_MISSING',
      },
    });
  }
  PurchasedProducts.update(
    req.params.id,
    new PurchasedProducts(req.body),
    // eslint-disable-next-line no-unused-vars
    (error, product) => {
      if (error) {
        res.send({
          error: {
            statusCode: 500,
            name: 'Server Error',
            message:
              error.message
              || `Error updating PurchasedProduct with id ${req.params.id}`,
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
 * /purchasedproducts/{id}:
 *   get:
 *     tags:
 *       - PurchasedProducts
 *     operationId: findById
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: PurchasedProduct model instance
 *         content:
 *             application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/NewPurchasedProduct'
 */
router.get('/:id', (req, res) => {
  PurchasedProducts.findById(req.params.id, (error, product) => {
    if (error) {
      res.send({
        statusCode: 404,
        name: 'Error',
        message: `Entity not found: PurchasedProduct with id ${req.params.id}`,
        code: 'ENTITY_NOT_FOUND',
      });
    }
    res.json(product);
  });
});

/**
 * @swagger
 * /purchasedproducts/{id}:
 *   delete:
 *     tags:
 *       - PurchasedProducts
 *     produces:
 *       - application/json
 *     operationId: deleteById
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: string
 *       required: true
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                 schema:
 *                    description: PurchasedProduct DELETE success
 */
router.delete('/:id', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  PurchasedProducts.delete(req.params.id, (error, product) => {
    if (error) {
      res.send({
        statusCode: 404,
        name: 'Error',
        message: `Entity not found: PurchasedProduct with id ${req.params.id}`,
        code: 'ENTITY_NOT_FOUND',
      });
    }
    res.json({
      id: req.params.id,
      message: 'PurchasedProduct deleted successfully',
    });
  });
});

/**
 * @swagger
 * /purchasedproducts:
 *   post:
 *     tags:
 *       - PurchasedProducts
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/NewPurchasedProduct'
 *     responses:
 *      200:
 *         description: PurchasedProduct model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewPurchasedProduct'
 */
// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: 'Bad Request',
          message:
            'Entity body missing: PurchasedProduct body data can not be empty',
          code: 'ENTITY_BODY_MISSING',
        },
      });
    }

    const newproduct = new PurchasedProducts(req.body);

    PurchasedProducts.create(newproduct, (error, id) => {
      if (error) {
        res.send({
          error: {
            statusCode: 500,
            name: 'Server Error',
            message: error.message || 'Error creating purchase product',
            code: 'SOMETHING_WENT_WRONG',
          },
        });
      }

      newproduct.id = id;
      res.json(newproduct);
    });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: 'Server Error',
        message: error.message || 'Error creating purchasedproduct',
        code: 'SOMETHING_WENT_WRONG',
      },
    });
  }
});

/**
 * @swagger
 * /purchasedproducts:
 *   get:
 *     tags:
 *       - PurchasedProducts
 *     operationId: find
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of PurchasedProduct model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/NewPurchasedProduct'
 */
router.get('/', (req, res) => {
  PurchasedProducts.findAll((error, purchasedproducts) => {
    if (error) {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: 'Server Error',
          message:
            error.message
            || 'Some error occurred while retrieving purchasedproducts.',
          code: 'SOMETHING_WENT_WRONG',
        },
      });
    }
    res.status(200).send(purchasedproducts);
  });
});

module.exports = router;
