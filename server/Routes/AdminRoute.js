import express from 'express';

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

export { router as adminlogin }