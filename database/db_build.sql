BEGIN;

DROP TABLE IF EXISTS users, userteams, teams, teamprojects, mentors;

CREATE TABLE IF NOT EXISTS users (
    id                SERIAL     PRIMARY KEY,
    first_name        TEXT       NOT NULL,
    last_name         TEXT       NOT NULL,
    github_user_name  TEXT       NOT NULL,
    nationality       TEXT       NOT NULL,
    languages         TEXT       NOT NULL,
    place_of_birth    TEXT       NOT NULL,
    favorite_hobby    TEXT       NOT NULL,
    favorite_book     TEXT       NOT NULL,
    siblings          INTEGER,
    mentor_id         INTEGER REFERENCES mentors(id)
);


CREATE TABLE IF NOT EXISTS userteams (
    user_id       INTEGER REFERENCES users(id),
    team_id       INTEGER REFERENCES teams(id)
);

CREATE TABLE IF NOT EXISTS teams (
    id            SERIAL    PRIMARY KEY,
    team_names    TEXT      NOT NULL
);

CREATE TABLE IF NOT EXISTS teamprojects (
    id               SERIAL    PRIMARY KEY,
    team_id          INTEGER REFERENCES teams(id)
    project_names    TEXT      NOT NULL
);

CREATE TABLE IF NOT EXISTS mentors (
    id              SERIAL    PRIMARY KEY,
    mentor_name     TEXT      NOT NULL,
    github_profile  TEXT      NOT NULL
);


COMMIT;
