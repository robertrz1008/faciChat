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
CREATE TABLE messages(
    id INT AUTO_INCREMENT,
    containe VARCHAR(200) NOT NULL,
    markate BOOLEAN DEFAULT 0,
    user_id INT(10) NOT NULL,
    creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    Foreign Key (user_id) REFERENCES users(id)
)



SELECT * FROM messages;

SELECT m.containe as "message", m.creation as "fecha y horario", u.name, u.email 
FROM messages as m JOIN users as u
ON m.user_id = u.id

DESCRIBE  users;

INSERT INTO messages(containe, user_id) VALUES("Este es el primer mensage", 1);