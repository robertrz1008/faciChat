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
    containe TEXT NOT NULL,
    id_user INT NOT NULL,
    id_chat INT NOT NULL,
    creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    Foreign Key (id_user) REFERENCES users(id)
);

CREATE TABLE chat_type(
    id INT AUTO_INCREMENT,
    name VARCHAR(23) DEFAULT "private",
    PRIMARY KEY(id)
)

CREATE TABLE chats(
    id INT AUTO_INCREMENT,
    id_type INT NOT NULL,
    PRIMARY KEY(id),
    Foreign Key (id_type) REFERENCES chat_type(id)
)

CREATE TABLE users_chat(
    id INT AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_chat INT NOT NULL,
    PRIMARY KEY(id),
    Foreign Key (id_user) REFERENCES users(id),
    Foreign Key (id_chat) REFERENCES chats(id)
)

DROP DATABASE appChatdb

drop TABLE messages

insert into chat_type(name) VALUES("public");

SELECT * FROM chat_type;

INSERT INTO users(name, email, password) VALUES("raul", "raul@gmail.com", "raul1"),("jose", "jose@gmail.com", "jose1")

SELECT * FROM users;

INSERT INTO chats(id_type) VALUES(1);

SELECT c.id, t.name  FROM chats as c join chat_type as t on c.id_type = t.id;

INSERT INTO users_chat(id_user, id_chat) VALUES(2, 1);
SELECT * FROM users_chat

INSERT INTO messages(containe, id_user, id_chat) VALUES("como anda el proyecto con el equipo", 1, 1);
INSERT INTO messages(containe, id_user, id_chat) VALUES("Pues mucho bugs  el login esta por concretarse", 2, 1);

SELECT * FROM messages;

SELECT u.name as "usuario", m.containe as "mensaje", m.creation as "hora y fecha de envio", t.name as "chat"
from messages as m JOIN users as u
on m.id_user = u.id 
JOIN users_chat as uc 
on u.id = uc.id_user
join chats as c
on uc.id_chat = c.id
JOIN chat_type as t
on c.id_type = t.id
WHERE c.id = 1 ORDER BY m.creation ASC

SELECT * FROM users_chat 