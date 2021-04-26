/* eslint-disable func-names */
const dbConn = require('../../bin/db');

/**
 * @swagger
 * components:
 *  schemas:
 *    Balance.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewBalance:
 *      properties:
 *        amount:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Balance.Filter:
 *      properties:
 *        amount:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Balance:
 *      properties:
 *        amount:
 *          type: number
 */

// Object for Balance
const Balance = function (balance) {
  this.amount = balance.amount;
};

// To create a new balance
Balance.create = function (newBalance, result) {
  dbConn.query('INSERT INTO balance set ?', newBalance, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

// To find balance by id
Balance.findById = function (id, result) {
  dbConn.query('Select * from balance where id = ? ', id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

// To find all available balance
Balance.findAll = function (result) {
  dbConn.query('Select * from balance', (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// To update the balance
Balance.update = function (id, balance, result) {
  dbConn.query(
    'UPDATE balance SET amount=? WHERE id = ?',
    [balance.amount, id],
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    },
  );
};

// To delete the balance
Balance.delete = function (id, result) {
  dbConn.query('DELETE FROM balance WHERE id = ?', [id], (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Balance;
