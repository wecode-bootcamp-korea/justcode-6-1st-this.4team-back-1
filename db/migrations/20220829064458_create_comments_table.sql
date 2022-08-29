-- migrate:up
CREATE TABLE comments (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
posting_id INT NOT NULL,
user_id INT NOT NULL,
comment VARCHAR(2000),
create_at DATETIME DEFAULT NOW(),
update_at DATETIME DEFAULT NOW(),
FOREIGN KEY (posting_id) REFERENCES postings(id) ON UPDATE CASCADE,
FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE comments;
