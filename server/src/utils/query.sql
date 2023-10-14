-- Active: 1689771897491@@localhost@3306@appchatdb

DESCRIBE users;

CREATE TABLE images(
     id INT AUTO_INCREMENT, 
    type VARCHAR(200),
    name VARCHAR(255) NOT NULL,
    data LONGBLOB,
    PRIMARY KEY(id)
)