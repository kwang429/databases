var models = require('../models');

var userFields = ['username'];
var messageFields = ['message', 'username', 'roomname'];

module.exports = {
  messages: {
    get: (req, res) => {
      // returns all of the messages it finds
      Message.findAll({ include: [User] }) // tells Sequelize to include this --> outer joins User by default
        .complete((err, results) => { // Sequelize's version of promise
          res.json(results);
        });
    },

    post: ({ body }, res) => {
      User.findOrCreate({ username: body[username] }) // finds the username from req.body -- if it doesn't exist, create one
        .complete((err, user) => {
          var params = {
            text: body[text],
            userid: user.id, // gets the id from the user obj that is passed as a response from User.findOrCreate
            roomname: body[roomname]
          };
          Message.create(params)
            .complete((err, results) =>
              res.sendStatus(201) // ends the response with a confirm code
            );
        });
    }
  },

  users: {
    get: (req, res) => {
      User.findAll()
        .complete((err, results) =>
          res.json(results)
        );
    },

    post: ({ body }, res) => {
      User.create({ username: body[username] })
        .complete((err, user) =>
          res.sendStatus(201)
        );
    }
  }
};

// module.exports = {
//   messages: {
//     get: function (req, res) {
//       // returns all of the messages it finds
//       Message.findAll({ include: [User] }) // telling Sequelize to include this is telling it to outer join User by default
//         .complete((err, results) => {
//           res.json(results);
//         })
//       });
//     }, // a function which handles a get request for all messages
//       // func takes in a res and a req
//       // then calles models.messages.get(callback)
//     post: function (req, res) {
//         // we need to fetch the user id
//       User.findOrCreate({ username: req.body.username }) // can create a user if it doesn't exist
//         .complete((err, user) => {
//           var params = {
//             text: req.body.text,
//             userid: ,
//             roomname: req.body.roomname
//           };
//           Message.create(params) // creates a message with the given params
//             .complete((err, results) => {
//               res.sendStatus(201); // responds with a confirmation code upon success
//             });
//         });
//     }
//   },

//   users: {
//     // Ditto as above
//     get: function (req, res) {
//       models.users.get((err, results) => {
//         res.json(results);
//       })
//     },
//     post: function (req, res) {}
//   }
// };

