--psql -U postgres
-- run the following query

CREATE DATABASE jwtdb;

--\c jwtdb
-- then run the rest

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  courses TEXT[],
);

CREATE TABLE courses(
  course_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_name TEXT NOT NULL,
  course_price INT NOT NULL,
  enrolled_members INT DEFAULT 0,
  course_instrcutor TEXT NOT NULL,
  course_link TEXT NOT NULL
);

--\dt

SELECT * FROM users;
SELECT * FROM courses;