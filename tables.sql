CREATE TABLE IF NOT EXISTS users_cookenu (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL,
    role VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS receitas_cookenu (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    ingredients VARCHAR(1000) NOT NULL,
    description VARCHAR(3000) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_cookenu(id)
);

CREATE TABLE IF NOT EXISTS followers (
    followed_id VARCHAR(64) NOT NULL,
    follower_id VARCHAR(64) NOT NULL,
    FOREIGN KEY (followed_id) REFERENCES users_cookenu(id),
    FOREIGN KEY (follower_id) REFERENCES users_cookenu(id)
);