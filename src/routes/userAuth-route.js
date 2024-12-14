const express = require('express');
const router = express.Router();
const {isLogin} = require('../middlewares/isLogin');
const accController = require('../controllers/accController');

// Routes untuk Register
router.get('/register', accController.renderRegisterPage);
router.post('/register', accController.registerUser);

// Routes untuk Login
router.get('/login', accController.renderLoginPage);
router.post('/login', accController.loginUser);

// Routes untuk Logout
router.get('/logout', isLogin, accController.logoutUser);

router.get('/', isLogin, (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layouts',
        title: 'Home',
        showNavbar: true,
        showFooter: true,
    });
});

module.exports = router;