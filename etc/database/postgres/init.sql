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