/* eslint-disable func-names */
const dbConn = require('../../bin/db');

/**
 * @swagger
 * components:
 *  schemas:
 *    Products.Count:
 *      properties:
 *        count:
 *          type: number
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewProduct:
 *      properties:
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
 *    Products.Filter:
 *      properties:
 *        name:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Products:
 *      properties:
 *        name:
 *          type: string
 *        price:
 *          type: number
 *        quantity:
 *          type: number
 *        image:
 *          type: string
 */

// Object for Product
const Product = function (product) {
  this.name = product.name;
  this.price = product.price;
  this.quantity = product.quantity;
  this.image = product.image;
  this.created_at = new Date();
};

// To create a new product
Product.create = function (newProduct, result) {
  dbConn.query('INSERT INTO products set ?', newProduct, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

// To find product by id
Product.findById = function (id, result) {
  dbConn.query('Select * from products where id = ? ', id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

// To find all available products
Product.findAll = function (result) {
  dbConn.query('Select * from products', (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// To update the product
Product.update = function (id, product, result) {
  dbConn.query(
    'UPDATE products SET name=?,price=?,quantity=?,image=? WHERE id = ?',
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

// To delete the product
Product.delete = function (id, result) {
  dbConn.query('DELETE FROM products WHERE id = ?', [id], (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Product;
