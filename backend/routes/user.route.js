const express = require('express');
const router = express.Router();
const { getUsers, getUser, addUser, updateUser, deleteUser } = require('../controller/user.controller')

router.get('/', async (req, res) => { await getUsers(req, res) });
router.get('/:ci', async (req, res) => { await getUser(req, res) });
router.post('/', async (req, res) => { await addUser(req, res) });
router.put('/:ci', async (req, res) => { await updateUser(req, res) });
router.delete('/:ci', async (req, res) => { await deleteUser(req, res) });

module.exports = router