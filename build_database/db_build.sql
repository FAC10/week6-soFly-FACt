BEGIN;

DROP TABLE IF EXISTS users, teams, userteam, teamprojects, mentors, usermentor CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id                SERIAL     PRIMARY KEY,
    first_name        VARCHAR(64)  NOT NULL,
    last_name         VARCHAR(64)  NOT NULL,
    github_user_name  VARCHAR(64)  NOT NULL,
    nationality       VARCHAR(64)  NOT NULL,
    languages         VARCHAR(64)  NOT NULL,
    place_of_birth    VARCHAR(64)  NOT NULL,
    favorite_hobby    VARCHAR(64)  NOT NULL,
    favorite_book     VARCHAR(64)  NOT NULL,
    siblings          INTEGER
);

CREATE TABLE IF NOT EXISTS teams (
    id            SERIAL    PRIMARY KEY,
    team_names    VARCHAR(64)  NOT NULL
);

CREATE TABLE IF NOT EXISTS userteam (
    user_id       INTEGER REFERENCES users(id),
    team_id       INTEGER REFERENCES teams(id)
);

CREATE TABLE IF NOT EXISTS teamprojects (
    id               SERIAL       PRIMARY KEY,
    team_id          INTEGER REFERENCES teams(id),
    project_names    VARCHAR(64)  NOT NULL,
    project_url      VARCHAR(64)  NOT NULL
);

CREATE TABLE IF NOT EXISTS mentors (
    id              SERIAL    PRIMARY KEY,
    mentor_name     VARCHAR(64)  NOT NULL,
    github_profile  VARCHAR(64)  NOT NULL
);

CREATE TABLE IF NOT EXISTS usermentor (
    mentor_id     INTEGER REFERENCES mentors(id),
    user_id       INTEGER REFERENCES users(id)
);

COMMIT;
