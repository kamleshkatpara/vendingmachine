import express from 'express';
import Balance from './model';

const router = express.Router();

/**
 * @swagger
 * /balance:
 *   post:
 *     tags:
 *       - Balance
 *     operationId: create
 *     consumes:
 *        - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/NewBalance'
 *     responses:
 *      200:
 *         description: Balance model instance
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewBalance'
 */

// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        error: {
          statusCode: 400,
          name: 'Bad Request',
          message: 'Entity body missing: Balance body data can not be empty',
          code: 'ENTITY_BODY_MISSING',
        },
      });
    }
    const newbalance = new Balance(req.body);

    Balance.create(newbalance, (error, id) => {
      if (error) {
        res.send({
          error: {
            statusCode: 500,
            name: 'Server Error',
            message: error.message || 'Error creating balance',
            code: 'SOMETHING_WENT_WRONG',
          },
        });
      }

      newbalance.id = id;
      res.send(newbalance);
    });
  } catch (error) {
    res.status(500).send({
      error: {
        statusCode: 500,
        name: 'Server Error',
        message: error.message || 'Error creating balance',
        code: 'SOMETHING_WENT_WRONG',
      },
    });
  }
});

/**
 * @swagger
 * /balance/{id}:
 *   put:
 *     tags:
 *       - Balance
 *     operationId: replaceById
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *          type: number
 *       required: true
 *     requestBody:
 *        content:
 *            application/json:
 *                schema:
 *                    $ref: '#/components/schemas/NewBalance'
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *             application/json:
 *                  schema:
 *                     description: NewBalance PUT success
 */

// eslint-disable-next-line consistent-return
router.put('/:id', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: {
        statusCode: 400,
        name: 'Bad Request',
        message: 'Entity body missing: NewBalance body data can not be empty',
        code: 'ENTITY_BODY_MISSING',
      },
    });
  }
  Balance.update(
    req.params.id,
    new Balance(req.body),
    // eslint-disable-next-line no-unused-vars
    (error, balance) => {
      if (error) {
        res.send({
          error: {
            statusCode: 500,
            name: 'Server Error',
            message:
              error.message
              || `Error updating Balance with id ${req.params.id}`,
            code: 'SOMETHING_WENT_WRONG',
          },
        });
      }
      res.json({
        amount: req.body.amount,
      });
    },
  );
});

/**
 * @swagger
 * /balance:
 *   get:
 *     tags:
 *       - Balance
 *     operationId: find
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of Balance model instances
 *         content:
 *             application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/NewBalance'
 */
router.get('/', (req, res) => {
  Balance.findAll((error, balance) => {
    if (error) {
      res.status(500).send({
        error: {
          statusCode: 500,
          name: 'Server Error',
          message:
            error.message || 'Some error occurred while retrieving balance.',
          code: 'SOMETHING_WENT_WRONG',
        },
      });
    }
    res
      .status(200)
      .send(
        balance.length === 0 ? { amount: 0 } : { amount: balance[0].amount },
      );
  });
});

module.exports = router;
