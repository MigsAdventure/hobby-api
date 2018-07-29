// create a model from user
const User = require('../../schema/Perler/user');

// checks if user exists in db
const userExists = (auth_name) => {
    console.log('auth_name', auth_name);
// look through all current users in db for user by name
    const users = ['Miguel Pardo', 'Charina'];
    const allowedUsers = users.includes(auth_name);

    console.log('allowedUSERS:', allowedUsers);

    if (allowedUsers) {
        return User.find({ name: auth_name })
            .then((dbUser) => {
                if (dbUser.length) {
                    return dbUser;
                } else {
                    // create a new user
                    return User.create({
                        name: auth_name,
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
        console.log('THIS RUNS');
        return  new Error('USER IS NOW AUTHORIZED');
    }
};

module.exports = userExists;
