-- Active: 1689771897491@@localhost@3306@appchatdb
CREATE DATABASE appChatdb

use appChatdb

SELECT
    m.id AS mensaje_id,
    m.creation AS fecha_creacion,
    u.id AS usuario_id,
    u.name AS nombre_usuario,
    c.id AS chat_id
FROM
    messages m
JOIN
    users u ON m.id_user = u.id
JOIN
    chats c ON m.id_chat = c.id
WHERE 
    c.id = 5 ORDER BY m.creation DESC;
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

INSERT INTO messages(containe, id_user, id_chat) VALUES("this is mesage to chat 3 by test1", 3, 5);
INSERT INTO messages(containe, id_user, id_chat) VALUES("Pues mucho bugs  el login esta por concretarse", 4, 3);

SELECT * FROM messages;


SELECT u.name, uc.id_chat FROM users as u JOIN users_chat as uc on u.id = uc.id_user 


SELECT u.name, u.id, m.containe, m.creation, c.id_chat,
FROM messages as m 
JOIN users as u 

SELECT * FROM users_chat WHERE id_user <> 4;

DELETE FROM messages WHERE id > 50
