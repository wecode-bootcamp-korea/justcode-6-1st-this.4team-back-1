-- migrate:up
CREATE TABLE stacks (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
stack_name VARCHAR(100),
stack_image VARCHAR(3000),
stack_classification VARCHAR(100)
);


-- migrate:down
DROP TABLE stacks;
