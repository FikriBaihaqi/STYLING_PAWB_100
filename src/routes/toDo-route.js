const express = require('express');
const router = express.Router();
const todosController = require('../controllers/ToDoController');

// Rute untuk menampilkan semua Todo
router.get('/', todosController.getTodo);

// Rute untuk menambahkan Todo baru
router.post('/todos', todosController.createTodo);

// Rute untuk menghapus Todo
router.post('/todos/delete', todosController.deleteTodo);

// Rute untuk mengubah status Todo
router.post('/todos/update', todosController.updateTodo);

module.exports = router;
