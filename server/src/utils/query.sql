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

SELECT u.name, uc.id_chat FROM users as u JOIN users_chat as uc on u.id = uc.id_user 


SELECT u.name, u.id, m.containe, m.creation, c.id_chat,
FROM messages as m 
JOIN users as u 


 SELECT
    u.name AS user_name,
    c.id AS chat_id,
    m.containe AS latest_message_content,
    mt.latest_message AS latest_message_time
FROM
    users u
JOIN
    users_chat uc ON u.id = uc.id_user
JOIN
    chats c ON uc.id_chat = c.id
JOIN (
    SELECT
        m.id_chat,
        MAX(m.creation) AS latest_message
    FROM
        messages m
    GROUP BY
        m.id_chat
) mt ON c.id = mt.id_chat
JOIN
    messages m ON mt.latest_message = m.creation AND mt.id_chat = m.id_chat
WHERE
    m.containe IS NOT NULL and uc.id_user <> 4;

SELECT * FROM users_chat WHERE id_user <> 4;