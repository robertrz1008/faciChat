-- Active: 1689771897491@@localhost@3306@appchatdb
CREATE DATABASE appChatdb

use appChatdb

CREATE TABLE users(
    id INT AUTO_INCREMENT,
    name VARCHAR(45) NOT null,
    email VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(100) not NULL,
    PRIMARY KEY(id)
);

SELECT * FROM users;

DESCRIBE  users;

INSERT INTO users(name, email, password) VALUES("test1", "test1@gmail.com", "test1");