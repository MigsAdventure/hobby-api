// create a model from user
const Card = require('../../schema/Perler/Card');
const User = require('../../schema/Perler/User');

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
    const allowedUsers = users.includes(req.body.email);
    console.log(req);
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
       return User.findById(req.query.id)
            .then(user => {
                if (!user) {
                    // create a new user
                    return User.create(req.body.user_info)
                        .then((sendUser) => {
                            return sendUser;
                        })
                        .catch((err) => {
                            return err;
                        });
                }
                return user;
            })
           .then(user => {
               return Card.create(req.body.card_info)
                   .then((card) => {
                       user.perlerCards.push(card);
                       return user;
                   })
           })
            .then(result => {
                result.save();
                return result;
            })
    } else {
        return new Promise((resolve, reject) => {
            resolve(req.email + ' IS NOT AUTHORIZED'); // fulfilled
            // or
            reject("THERE WAS AN ERROR ON USER EXISTS CHECK"); // rejected
        });
    }
};

exports.deleteCard = (params) => {
    return User.findById(params.id)
        .then((user) => {
            user.perlerCards.pull(params.cardId);
            user.save();
            Card.find({ url: 'google.com' }).remove();
            return user
        });
};

exports.cardById = (card_id) => {
    return Card.findById(card_id)
        .populate('owner')
        .then((owner) => {
            return owner
        });
};
