-- Active: 1689771897491@@localhost@3306@appchatdb

DESCRIBE users;

CREATE TABLE images(
    id INT AUTO_INCREMENT, 
    type VARCHAR(200),
    name VARCHAR(255) NOT NULL, 
    data LONGBLOB,
    PRIMARY KEY(id)
);
SELECT * FROM users;

DELETE FROM images WHERE id > 6;

ALTER TABLE users ADD id_image INT DEFAULT 2;
ALTER TABLE users ADD Foreign Key(id_image) REFERENCES images(id);

DESCRIBE users;

use ventadb;

SELECT * FROM products ORDER BY id DESC LIMIT 1

update users set id_image = 6 WHERE id >6

SELECT * from images;

DESCRIBE images

