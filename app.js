require('dotenv').config({ silent: true });
// CONSTANTS

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/appDb';
// REQUIRES
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// INITIALIZE SERVER
const app = express();
const server = require('http').createServer(app);

require('mongoose').connect(MONGO_URI, (err) => {
  if (err) throw err;
  console.log(`MongoDB connected to ${MONGO_URI}`);
});

server.listen(PORT, (err) => {
  console.log(err || `Express listening on port ${PORT}`);
});

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
require('./config/webpack')(app);

// ERROR/SEND HANDLE
app.use((req, res, next) => {
  res.handleSend = (err, data) => res.status(err ? 400 : 200).send(err || data);
  next();
});

// ROUTING
app.use('/api', require('./routes/api'));

// ALLOW REACT ROUTING
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
