const db = require('../config/database.js');

// Controller untuk Menampilkan Semua Todo
const getTodo = (req, res) => {
    const sql = 'SELECT * FROM todos';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching todos: ', err);
            return res.status(500).send('Gagal mendapatkan daftar todos');
        }
        res.render('todos', {
            layout: 'layouts/main-layouts',
            title: 'todos',
            showNavbar: true,
            showFooter: true,
            todos: results,
        });
    });
};

// Controller untuk Menambahkan Todo Baru
const createTodo = (req, res) => {
    const { judul, deskripsi } = req.body;
    const sql = `INSERT INTO todos (judul, deskripsi) VALUES (?, ?)`;
     
    db.query(sql, [judul, deskripsi], (err, result) => {
        if (err) {
            console.error('Error creating todos: ', err);
            return res.status(500).send('Gagal menambahkan todo baru');
        }
        const newTodo = { id: result.insertId, judul, deskripsi };
        res.status(200).json(newTodo); // Return newly created todo
    });     
};


// Controller untuk Menghapus Todo
const deleteTodo = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM todos WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting todo: ', err);
            return res.status(500).send('Gagal menghapus todo');
        }
        res.status(200).json({ message: 'Todo berhasil dihapus' });
    });
};

// Controller untuk Mengedit Todo (Judul dan Deskripsi)
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { judul, deskripsi } = req.body;

    const sql = 'UPDATE todos SET judul = ?, deskripsi = ? WHERE id = ?';

    db.query(sql, [judul, deskripsi, id], (err, result) => {
        if (err) {
            console.error('Error updating todo: ', err);
            return res.status(500).send('Gagal mengupdate todo');
        }

        // Redirect ke halaman todos setelah update berhasil
        res.status(200).json({ id, judul, deskripsi });
    });
};

// Controller untuk Render Login Page
const renderLoginPage = (req, res) => {
    res.render('todos', {
        layout: 'layouts/main-layouts',
        title: 'todos',
        showNavbar: false,
        showFooter: false,
    });
};

module.exports = { getTodo, createTodo, deleteTodo, updateTodo, renderLoginPage };
