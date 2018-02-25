"use strict"
const router = require('express').Router();

// perler route
router.use('/perler', require('./perler/perler'));

// api endpoint
router.route('/')
.get((req, res) => {
  console.log('received');
res.send('THIS WORKS');
});

module.exports = router;
