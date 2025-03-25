CREATE USER core_user WITH PASSWORD 'core_pass' CREATEDB;
CREATE DATABASE core;
\c core
GRANT ALL PRIVILEGES ON DATABASE core TO core_user;
GRANT ALL ON SCHEMA public TO core_user;


CREATE USER auth_user WITH PASSWORD 'auth_pass' CREATEDB;
CREATE DATABASE auth;
\c auth
GRANT ALL PRIVILEGES ON DATABASE auth TO auth_user;
GRANT ALL ON SCHEMA public TO auth_user;

CREATE USER posts_user WITH PASSWORD 'posts_pass' CREATEDB;
CREATE DATABASE posts;
\c posts
GRANT ALL PRIVILEGES ON DATABASE posts TO posts_user;
GRANT ALL ON SCHEMA public TO posts_user;

CREATE USER media_user WITH PASSWORD 'media_pass' CREATEDB;
CREATE DATABASE media;
\c media
GRANT ALL PRIVILEGES ON DATABASE media TO media_user;
GRANT ALL ON SCHEMA public TO media_user;

CREATE USER course_user WITH PASSWORD 'course_pass' CREATEDB;
CREATE DATABASE course;
\c course
GRANT ALL PRIVILEGES ON DATABASE course TO course_user;
GRANT ALL ON SCHEMA public TO course_user;

CREATE USER threads_user WITH PASSWORD 'threads_pass' CREATEDB;
CREATE DATABASE threads;
\c threads
GRANT ALL PRIVILEGES ON DATABASE threads TO threads_user;
GRANT ALL ON SCHEMA public TO threads_user;

CREATE USER events_user WITH PASSWORD 'events_pass' CREATEDB;
CREATE DATABASE events;
\c events
GRANT ALL PRIVILEGES ON DATABASE events TO events_user;
GRANT ALL ON SCHEMA public TO events_user;