var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // retrieve all messages
      // we want the id, text, roomname, and username of ONE message
      var queryStr = 'SELECT messages.id, messages.text, messages.roomname, users.username FROM messages \
                      LEFT OUTER JOIN users ON (messages.userid = users.id) \
                      ORDER BY messages.id DESC';
      db.query(queryStr, (err, results) => {
        callback(results);
      });
    }, // a function which produces all the messages

    post: function (params, callback) {
      // create a message
      var queryStr = 'INSERT INTO messages (text, userid, roomname) \
                      VALUES (?, (SELECT id FROM users WHERE username = ? LIMIT 1), ?)';
      db.query(queryStr, params, (err, results) => {
        callback(results);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      // retrieve all users
      var queryStr = 'select * from users';
      db.query(queryStr, (err, results) => {
        callback(results);
      });
    },
    post: function (params, callback) {
      // create a user
      var queryStr = 'insert into users (username) values (?)';
      db.query(queryStr, params, (err, results) => {
        callback(results);
      });
    }
  }
};

