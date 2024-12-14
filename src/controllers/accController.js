const db = require('../config/database');

// Controller untuk Register User
const registerUser = (req, res) => {
    const { username, password } = req.body;
    const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Register Error : ', err);
            return res.status(500).send('Gagal Mendaftar User');
        } else {
            res.status(200).json({ message: 'User berhasil terdaftar' });
        }
    });
};

// Controller untuk Render Register Page
const renderRegisterPage = (req, res) => {
    res.render('register', {
        layout: 'layouts/main-layouts',
        title: 'Register',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller untuk Render Login Page
const renderLoginPage = (req, res) => {
    res.render('login', {
        layout: 'layouts/main-layouts',
        title: 'Login',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller untuk Login User
const loginUser = (req, res) => {
    const { username, password } = req.body;

    db.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (err, result) => {
        if (err) {
            console.error('Login Error : ', err);
            return res.status(500).send('Gagal Login User');
        }
        if (result.length === 0) {
            console.log('Username atau Password Salah', username , password);
            return res.status(400).send('User tidak ditemukan');
        }

        req.session.idUser = result[0].id;
        console.log('Login Berhasil',);
        res.redirect('/');
    });
};

// Controller untuk Logout User
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error : ', err);
            return res.status(500).send('Gagal Logout User');
        }
        res.redirect('/login');
    });
};

// Export semua controller
module.exports = {
    registerUser,
    renderRegisterPage,
    renderLoginPage,
    loginUser,
    logoutUser,
};