-- Active: 1700335799467@@127.0.0.1@3300@appchatdb

DESCRIBE users;

CREATE TABLE images(
    id INT AUTO_INCREMENT, 
    type VARCHAR(45),
    name VARCHAR(45) NOT NULL, 
    data LONGBLOB,
    PRIMARY KEY(id)
);

    
use appChatdb;

CREATE TABLE users (
    id INT AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE type_chat(
    id int AUTO_INCREMENT,
    description VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);
INSERT INTO type_chat(description) VALUES("private");
SELECT * FROM type_chat;

-- Tabla de chats
CREATE TABLE chats (
    id INT AUTO_INCREMENT ,
    id_type INT NOT NULL,
    PRIMARY KEY(id),
    Foreign Key (id_type) REFERENCES type_chat(id)
);

-- Tabla de usuarios en un chat
CREATE TABLE users_chat (
    id_user INT not null,
    id_chat INT not NULL,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_chat) REFERENCES chats(id)
);

-- Tabla de mensajes
CREATE TABLE messages (
    id INT AUTO_INCREMENT,
    containe TEXT NOT NULL,
    id_user INT NOT NULL,
    id_chat INT NOT NULL,
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_chat) REFERENCES chats(id),
    PRIMARY KEY(id)
);

-- Tabla de imágenes
CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    data BLOB NOT NULL
);

-- Relacionar usuarios con imágenes
ALTER TABLE users 
ADD FOREIGN KEY (id_image) REFERENCES images(id);

ALTER TABLE users ADD id_image int DEFAULT 1;

select * from images;

select * from messages;