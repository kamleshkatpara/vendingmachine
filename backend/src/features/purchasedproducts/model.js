/* eslint-disable func-names */
const dbConn = require('../../bin/db');

/**
 * @swagger
 * components:
 *  schemas:
 *    PurchasedProducts.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewPurchasedProduct:
 *      properties:
 *        refid:
 *          type: number
 *        name:
 *          type: string
 *          default: ''
 *        price:
 *          type: number
 *          default: 0
 *        quantity:
 *          type: number
 *          default: 0
 *        image:
 *          type: string
 *          default: ''
 *
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    PurchasedProducts.Filter:
 *      properties:
 *        name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    PurchasedProducts:
 *      properties:
 *        refid:
 *          type: number
 *        name:
 *          type: string
 *        price:
 *          type: number
 *        quantity:
 *          type: number
 *        image:
 *          type: string
 */

// Object for Purchased Product
const PurchasedProduct = function (purchasedproduct) {
  this.refid = purchasedproduct.refid;
  this.name = purchasedproduct.name;
  this.price = purchasedproduct.price;
  this.quantity = purchasedproduct.quantity;
  this.image = purchasedproduct.image;
  this.created_at = new Date();
};

// To create a new purchased product
PurchasedProduct.create = function (newProduct, result) {
  dbConn.query(
    'INSERT INTO purchasedproducts set ?',
    newProduct,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    },
  );
};

// To find purchased product by id
PurchasedProduct.findById = function (id, result) {
  dbConn.query(
    'Select * from purchasedproducts where refid = ? ',
    id,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    },
  );
};

// To find all available purchased products
PurchasedProduct.findAll = function (result) {
  dbConn.query('Select * from purchasedproducts', (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// To update the purchased product
PurchasedProduct.update = function (id, product, result) {
  dbConn.query(
    'UPDATE purchasedproducts SET name=?,price=?,quantity=?,image=? WHERE refid = ?',
    [product.name, product.price, product.quantity, product.image, id],
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    },
  );
};

// To delete the purchased product
PurchasedProduct.delete = function (id, result) {
  dbConn.query(
    'DELETE FROM purchasedproducts WHERE refid = ?',
    [id],
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    },
  );
};

module.exports = PurchasedProduct;
