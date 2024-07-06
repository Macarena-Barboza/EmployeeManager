import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
})

db.connect(function (err) {
    if (err) {
        console.log("connection error db")
        console.log(err)

    } else {
        console.log("Connected db")
    }
})

export default db;
