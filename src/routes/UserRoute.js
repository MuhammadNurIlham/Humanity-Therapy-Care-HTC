const express = require('express');

const { addUser, getUser, getUsers, updateUser, deleteUser } = require('../controllers/UserController');

const router = express.Router();

router.post('/user', addUser);
router.get('/user/:id', getUser);
router.get('/users', getUsers);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;