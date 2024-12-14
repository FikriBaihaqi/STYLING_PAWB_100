const mysql2 = require('mysql2');
require('dotenv').config();

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log('Koneksi ke Database Gagal : ' + err);
    } 
        console.log('Koneksi ke Database Berhasil');
    }
);

module.exports = db;

