DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  fname VARCHAR(255),
  lname VARCHAR(255),
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  favorite_source VARCHAR(255),
  location VARCHAR(255)
);
