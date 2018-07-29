// // create a model from user
// const User = require('../schema/global/user');
//
// // checks if user exists in db
// exports.userExists = (authUser, req, cb) => {
// // look through all current users in db for employee by emp id
//   User.find({ employee_id: authUser.employeeID })
//   .then((dbUser) => {
//     if (dbUser.length) {
//       return dbUser;
//     } else {
//       const is_admin = authUser.sAMAccountName.toLowerCase().match(/pat|jchen|jmaddox|miguelpg|aniculescu/gm) ? true: false;
//         // create a new user
//         return User.create({
//           employee_id: authUser.employeeID,
//           name: authUser.sAMAccountName,
//           email: authUser.mail,
//           //permissions:
//           is_admin : is_admin,
//         })
//     }
//   })
//   .then((sendUser) => {
//     cb(null, sendUser);
//   })
//   .catch((err) => {
//     cb(err);
//   });
// };
