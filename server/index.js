import express from 'express'
import { adminRouter } from './Routes/AdminRoute.js';
import cors from 'cors'
import cookieParser from "cookie-parser";
import { employeeRouter } from './Routes/employeeRoute.js';
import jwt from 'jsonwebtoken'

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json())
app.use(cookieParser())
app.use('/auth', adminRouter)
app.use('/employee', employeeRouter)
app.use(express.static('Public'))

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, "jwt_secret_key", (err, decoded) => {
            if (err) return res.json({ Status: false, Error: 'Wrong Token' });
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        })
    } else {
        return res.json({ Status: false, Error: 'Not autheticated' });
    }
}

app.get('/verify', verifyUser, (req, res) => {
    return res.json({ Status: true, role: req.role, id: req.id })
})

const PORT = process.env.PORT ?? 8083

app.listen(PORT, () => {
    console.log(`server list http://localhost:${PORT}`)
})
