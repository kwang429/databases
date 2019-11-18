CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id int not null auto_increment,
  userid int not null,
  text varchar(200) not null,
  roomname varchar(20),
  primary key (id)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id int not null auto_increment,
  username varchar(40) not null,
  primary key (id)
)



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

