const express = require('express');
const router = express.Router();
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../controller/product.controller')

router.get('/', async (req, res) => { await getProducts(req, res) });
router.get('/:id', async (req, res) => { await getProduct(req, res) });
router.post('/', async (req, res) => { await addProduct(req, res) });
router.put('/:id', async (req, res) => { await updateProduct(req, res) });
router.delete('/:id', async (req, res) => { await deleteProduct(req, res) });

module.exports = router