"use strict"
const router = require('express').Router();

router.route('/')
.get((req, res) => {
  console.log('received');
res.send('PERLER WORKS');
});

module.exports = router;
