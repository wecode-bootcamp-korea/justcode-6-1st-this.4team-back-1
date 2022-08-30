-- migrate:up
CREATE TABLE stacks (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name VARCHAR(100),
image VARCHAR(2000),
classification VARCHAR(100)
);


-- migrate:down
DROP TABLE stacks;
