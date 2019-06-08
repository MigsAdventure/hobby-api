"use strict"
const router = require('express').Router();


// perler route
router.use('/perler', require('./perler/perler'));

// slack route
router.use('/slack', require('./slack/slack'));

// status route
router.use('/status', require('./status/status'));

// status route
router.use('/email', require('./email'));

// api endpoint
router.route('/wakeme')
.get((req, res) => {
  res.send("I'm awake!");
});

module.exports = router;
