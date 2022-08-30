-- migrate:up
CREATE TABLE posting_stack (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
posting_id INT NOT NULL,
stack_id INT NOT NULL,
FOREIGN KEY (posting_id) REFERENCES postings(id) ON UPDATE CASCADE,
FOREIGN KEY (stack_id) REFERENCES stacks(id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE user_stack;
