// create a model from user
const User = require('../../schema/Perler/user');

// checks if user exists in db
 exports.userExists = (auth_email) => {
    console.log('auth_email', auth_email);
// look through all current users in db for user by name
    const users = ['migsub77@gmail.com', 'charinaisabel@gmail.com'];
    const allowedUsers = users.includes(auth_email);

    if (allowedUsers) {
        return User.find({ email: auth_email })
            .then((dbUser) => {
                if (dbUser.length) {
                    return dbUser;
                } else {
                    // create a new user
                    return User.create({
                        email: auth_email,
                    })
                }
            })
            .then((sendUser) => {
                return sendUser;
            })
            .catch((err) => {
                return err;
            });
    } else {
        return new Promise((resolve, reject) => {
           resolve(auth_email + ' IS NOT AUTHORIZED'); // fulfilled
            // or
            reject("THERE WAS AN ERROR ON USER EXISTS CHECK"); // rejected
        });
    }
};