"use strict";
const router = require('express').Router();
const User = require('../../models/Perler/User');
const Card = require('../../models/Perler/Card');
// const Card = require('../../schema/Perler/Card');
// const User = require('../../schema/Perler/User');

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
        User.getuserCards(req.params.id, (err, user) => {
            console.log('user : ', user);
            if (err) res.send(err);
            res.send(user);
        })
    });

router.route('/user/:id/card/:cardId')
    .delete((req, res) => {
        Card.deleteCard(req.params)
            .then((card) => {
                res.send(card);
            });
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

    // .post((req, res) => {
    //     Card.addCard(req)
    //         .then((data) => {
    //             res.send(data);
    //         })
    //         .catch((err) => {
    //             res.status(400).send(err);
    //         });
    // });

router.route('/card/:id')
    .post((req, res) => {
        Card.addCard(req)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    })

    .delete((req, res) => {
        Card.deleteCard(req.params.id)
            .then((card) => {
                res.send(card);
            });
    });



module.exports = router;
