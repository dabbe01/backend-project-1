const express = require('express')
require('dotenv').config()

const app = express()
const userRoutes = require('./routes/staff.js')
const {errorHandler} = require('./middleware/errorHandler')
app.use(express.json())

app.use('/api/v1', userRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Serve is on port ${PORT}`))