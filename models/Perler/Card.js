// create a model from user
const Card = require('../../schema/Perler/Card');
const User = require('../../schema/Perler/User');
String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};
// gets a list of all users object
exports.listAllCards = (cb) => {
    return Card.find({}, (err, cards) => {
        if(err) {
            cb(err);
        }
        cb(null, cards);
    });
};

exports.addCard = (req) => {
// look through all current users in db for user by name
    const users = ['migsub77@gmail.com', 'charinaisabel@gmail.com', 'kazandra542@gmail.com', 'aheredia242@gmail.com'];
    const allowedUsers = users.includes(req.body.email.toLowerCase());
    if (allowedUsers) {
       return Card.findByIdAndUpdate(req.params.id,{user: req.body.user_name}, {new: true})
            .then(card => {
                if (!card) {
                    // create a new user
                    return JSON.stringify({"error": "CARD DOES NOT EXIST"});
                }
                return card;
            })
            .then(result => {
                return result;
            })
    } else {
        return new Promise((resolve, reject) => {
            resolve(req.body.email + ' IS NOT AUTHORIZED'); // fulfilled
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

