var Sequelize = require('Sequelize');
var orm = new Sequelize('chat', 'root', '');

var User = orm.define('User', {
  username: Sequelize.STRING
});

var Messages = orm.define('Messages', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

// declares the relationships between tables
User.hasMany(Message);
Message.belongsTo(User); // tells the orm that User is where the foreign key is referring to

User.sync(); // syncs the DB with the schema we created
Message.sync();

exports.User = User;
exports.Message = Message;