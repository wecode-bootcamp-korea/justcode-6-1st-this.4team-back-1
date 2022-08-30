-- migrate:up
CREATE TABLE user_stack (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
stack_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
FOREIGN KEY (stack_id) REFERENCES stacks(id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE user_stack;
