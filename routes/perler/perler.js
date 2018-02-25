"use strict"
const router = require('express').Router();

// add root if necessary
router.route('/').get((req, res) => {
  console.log('REQ.BODY:', req.body);
  res.send('ok');
});

module.exports = router;
