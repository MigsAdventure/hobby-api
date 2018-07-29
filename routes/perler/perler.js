"use strict"
const router = require('express').Router();
const User = require('../../models/Perler/User');


router.route('/fetch-user-perlers')
    .get((req, res) => {
    console.log('req.body');

    res.send('PERLER WORKS');
  })

    .post((req, res) => {
        User.userExists(req.body.email)
            .then((data) => {
                console.log('data: ', data);
                res.send(data);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
});

module.exports = router;
