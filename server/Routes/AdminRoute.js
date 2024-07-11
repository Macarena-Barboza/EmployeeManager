import express from 'express';
import db from '../database/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'

const router = express.Router();

router.post("/adminlogin", (req, res) => {
    const { email, password } = req.body
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ loginStatus: false, Error: "Database error" });
        }
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email, id: result[0].id },
                "jwt_secret_key",
                { expiresIn: "1d" }
            );
            res.cookie('token', token, { httpOnly: true });
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post("/add_category", (req, res) => {
    const sql = "INSERT INTO category (name) VALUES (?)";
    db.query(sql, [req.body.category], (err, result) => {
        if (err) return res.status(500).json({ status: false, error: 'Failed to insert category' });
        return res.json({ status: true });
    });
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee (name, email, password, salary, address, category_id, image) VALUES (?)";
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            req.body.address,
            req.body.category_id,
            req.file.filename,
        ]
        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })

        })
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    const sql = "SELECT * FROM employee WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id
    const sql = 'UPDATE employee SET name= ?, email= ?, salary= ?, address= ?, category_id= ? WHERE id = ?';
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id,
    ]
    db.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err })
        return res.json({ Status: true })
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id
    const sql = 'DELETE from employee WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err })
        return res.json({ Status: true, Result: result })
    })
})



export { router as adminRouter }