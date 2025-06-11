const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API pour gérer les produits
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Liste de produits
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products/faker:
 *   post:
 *     summary: Générer des produits fake
 *     tags: [Products]
 */
router.post('/faker', productController.generateFakeProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Récupérer un produit par ID
 *     tags: [Products]
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Supprimer un produit par ID
 *     tags: [Products]
 */
router.delete('/:id', productController.deleteProduct);



module.exports = router;
