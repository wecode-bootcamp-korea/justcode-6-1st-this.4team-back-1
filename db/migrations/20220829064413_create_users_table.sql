-- migrate:up
CREATE TABLE users (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
email VARCHAR(100) UNIQUE NOT NULL,
nickname VARCHAR(50),
password VARCHAR(300) NOT NULL,
profile_image VARCHAR(3000),
stack VARCHAR(100)
);

-- migrate:down
DROP TABLE users;
