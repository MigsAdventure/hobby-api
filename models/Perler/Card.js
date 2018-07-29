// create a model from user
const Card = require('../../schema/Perler/card');
const User = require('../../schema/Perler/user');

// gets a list of all users object
exports.listAllCards = (cb) => {
    return Card.find({}, (err, cards) => {
        if(err) {
            cb(err);
        }
        cb(null, cards);
    });
};

// checks if user exists in db
exports.addCard = (req) => {
// look through all current users in db for user by name
    const users = ['migsub77@gmail.com', 'charinaisabel@gmail.com'];
    const allowedUsers = users.includes(req.email);

    if (allowedUsers) {
        // create a new user
        // return User.findById(req._id)
        //     .populate('cards')
        //         .then(cards => {
        //             return Card.create(cards)
        //                 .then((createdCard) => {
        //                     return createdCard;
        //                 })
        //                 .catch((err) => {
        //                     return err;
        //                 });
        //         })
        //     .catch((err) => {
        //         return err;
        //     });

            let card_id;
            return Card.create({}, req)
                .then((card) => {
                    console.log('card: ', card);
                    card_id = card._id;
                    return User.find({googleId: req.googleId});
                })
                .then((user) => {
                    console.log('USER: ', user);
                    user[0].perler_cards.push(card_id);
                    return user.save();
                })
                .then(() => User.find({googleId: req.googleId}).populate('owner'))
                .then(user => (user));



    } else {
        return new Promise((resolve, reject) => {
            resolve(req.email + ' IS NOT AUTHORIZED'); // fulfilled
            // or
            reject("THERE WAS AN ERROR ON USER EXISTS CHECK"); // rejected
        });
    }
};

exports.cardById = (card_id) => {
    return Card.findById(card_id)
        .populate('owner')
        .then((owner) => {
            return owner
        });
};

