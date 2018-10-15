// create a model from user
const User = require('../../schema/Perler/User');

// gets a list of all users object
exports.listAllUsers = (cb) => {
    return User.find({}, (err, users) => {
        if(err) {
            cb(err);
        }
        cb(null, users);
    });
};

// checks if user exists in db
 exports.addUser = (req) => {
// look through all current users in db for user by name
    const users = ['migsub77@gmail.com', 'charinaisabel@gmail.com'];
    const allowedUsers = users.includes(req.email);

    if (allowedUsers) {
                // create a new user
        return User.create(req)
            .then((sendUser) => {
                return sendUser;
            })
            .catch((err) => {
                return err;
            });
    } else {
        return new Promise((resolve, reject) => {
           resolve(req.email + ' IS NOT AUTHORIZED'); // fulfilled
            // or
            reject("THERE WAS AN ERROR ON USER EXISTS CHECK"); // rejected
        });
    }
};

 exports.userCards = (user_id, cb) => {
     return User.findById(user_id)
         .populate('perler_cards')
         .then((cards) => {
             cb(null, cards);
         });
 };

