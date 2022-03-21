const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 7000;
const cors = require('cors');
const app = express();
// DATABASE MONGGOSE
const connectDB = require('./config/db')

// ROUTES
const indexRouter = require('./routes');

const { errorHandler } = require('./middleware/errorHandlerMiddleware');

// APP USE
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

// APP USE ROUTER

app.use('/api', indexRouter)
app.get('/retrieve', (req, res, next) => {
  console.log(req.query.path)
  res.sendFile(path.join(__dirname, req.query.path))  // Image buffer read from the path.
});

// ////////////////////////////

///////////////////////////////

app.use(errorHandler)

// APP LISTEN
app.listen(PORT, () => {
  console.log(`server is started on port ${PORT}`)
  connectDB()
})