const express = require('express');
const router = express.Router();
const { getOrder, getOrders, getOrdersByUserCi, addOrder, updateOrder, updateOrderStatus, deleteOrder } = require('../controller/order.controller')

router.get('/', async (req, res) => { await getOrders(req, res) });
router.get('/:id', async (req, res) => { await getOrder(req, res) });
router.get('/:ci', async (req, res) => { await getOrdersByUserCi(req, res) });
router.post('/', async (req, res) => { await addOrder(req, res) });
router.put('/:id', async (req, res) => { await updateOrder(req, res) });
router.delete('/:id', async (req, res) => { await deleteOrder(req, res) });
router.put('/status/:id', async (req, res) => { await updateOrderStatus(req, res) });


module.exports = router