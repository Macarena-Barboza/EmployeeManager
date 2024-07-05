import express from 'express'


const app = express();

const PORT = process.env.PORT ?? 8083

app.listen(PORT, () => {
    console.log(`server list http://localhost:${PORT}`)
})
