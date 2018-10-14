"use strict";
const router = require('express').Router();
const User = require('../../models/Perler/User');
const Card = require('../../models/Perler/card');


router.route('/user')
    // get current users with their perler beads
    .get((req, res) => {
        User.listAllUsers((err, users) => {
            if (err) {
                err.status(400).send(err);
            }
            res.send(users);
        });
  })
    // get user email and add
    .post((req, res) => {
        User.addUser(req.body)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
});

router.route('/user/:id')
    .get((req, res) => {
        User.getUserCards = (err, user_cards) => {
            if (err) {
                err.status(400).send(err);
            }
            res.send(user_cards);
        }
    });

// start of perler cards
router.route('/card')
    // get current users with their perler beads
    .get((req, res) => {
        Card.listAllCards((err, users) => {
            if (err) {
                err.status(400).send(err);
            }
            res.send(users);
        });
  })
    // get user email and add
    .post((req, res) => {
        console.log(req.body);
        Card.addCard(req.body)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
});

router.route('/card/:id')
    .get((req, res) => {
        Card.cardById = (user_cards) => {
            res.send(user_cards);
        }
    });



module.exports = router;
