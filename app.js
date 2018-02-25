require('dotenv').config({ silent: true });
// CONSTANTS

const PORT = process.env.PORT || 8000;
const ENV = process.env.NODE_ENV;
const envConfig = require('./config/environment');
const site_origin = envConfig.SITE_URL;
const DB_URI = envConfig.DB_URI;
const morgan = require('morgan');
// REQUIRES
const bodyParser = require('body-parser');
const express = require('express');

// INITIALIZE SERVER
const app = express();
const server = require('http').createServer(app);


// MONGO
require('mongoose').connect(DB_URI, (err) => {
  if (err) throw err;
  console.log(`MongoDB connected to ${DB_URI}`);
});


server.listen(PORT, (err) => {
  console.log(err || `Express listening on port ${PORT}`);
});

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ERROR/SEND HANDLE
app.use((req, res, next) => {
  res.handleSend = (err, data) => res.status(err ? 400 : 200).send(err || data);
  next();
});

// ROUTING
app.use('/api', require('./routes/api'));
