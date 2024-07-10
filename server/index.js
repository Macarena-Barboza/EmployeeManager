import express from 'express'
import { adminRouter } from './Routes/AdminRoute.js';
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json())
app.use(cookieParser())
app.use('/auth', adminRouter)

const PORT = process.env.PORT ?? 8083

app.listen(PORT, () => {
    console.log(`server list http://localhost:${PORT}`)
})
console.log(PORT)