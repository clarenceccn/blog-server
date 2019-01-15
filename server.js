require('dotenv').config()

// Dependencies 
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const blogroutes = require('./routes/blogs');
const router = express.Router();
const app = express();
const port = 8080;

// Connecting to database
mongoose.connect(process.env.MONGO_API_KEY, { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('Connected to database!'));
mongoose.connection.on('error', (err) => console.log('Error connecting to database: ' + err));
mongoose.connection.on('disconnected', () => console.log('Disconnected from database'));
process.on('SIGINT', () => {
    mongoose.connection.close(() => console.log('Disconnected from database due to app termination'));
    process.exit(0);
});

// Adding middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use('/blogs', blogroutes);

// Starts server on port 
app.listen(port, () => console.log(`App listening on port ${port}!`));