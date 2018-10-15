"use strict";
const router = require('express').Router();
const User = require('../../models/Perler/User');
const Card = require('../../models/Perler/Card');

module.exports = router;

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
    .put((req, res) => {
        Card.findOne({ _id: req.params.id })
            .then((card) => {
                let current_owner = card.owner;
                return Card.FindOneAndUpdate(req.params.id, { $set: { owner: current_owner } });
            })
            .then(message => res.send(message))
            .catch(err => res.status(400).send(err));
    });



module.exports = router;
