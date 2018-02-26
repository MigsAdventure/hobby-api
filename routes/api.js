"use strict"
const router = require('express').Router();

// perler route
router.use('/perler', require('./perler/perler'));

// slack route
router.use('/slack', require('./slack/slack'));

// api endpoint
router.route('/')
.get((req, res) => {
  console.log('received');
res.send('THIS WORKS');
});

module.exports = router;
