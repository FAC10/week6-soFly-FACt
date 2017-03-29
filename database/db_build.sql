BEGIN;

DROP TABLE IF EXISTS users, teams, userteam, teamprojects, mentors, usermentor CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id                SERIAL     PRIMARY KEY,
    first_name        VARCHAR(64)  NOT NULL,
    middle_name       VARCHAR(64),
    last_name         VARCHAR(64)  NOT NULL,
    github_user_name  VARCHAR(64)  NOT NULL,
    nationality       VARCHAR(64)  NOT NULL,
    languages         VARCHAR(64)  NOT NULL,
    place_of_birth    VARCHAR(64)  NOT NULL,
    favorite_hobby    VARCHAR(64)  NOT NULL,
    favorite_book     VARCHAR(64)  NOT NULL,
    siblings          INTEGER
);

INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Yvonne', 'Yutong', 'Liu', 'yvonne-liu', 'American', 'English, Mandarin Chinese, some Italian', 'Taipei, Taiwan', 'Hiking', 'East of Eden', 0);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Finn', 'Webb Newell', 'Hodgkin', 'finnhodgkin', 'British', 'English', 'London, UK', 'Climbing', 'The Lacuna', 2);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Lucy', 'Rose', 'Sabin', 'lucyrose93', 'British', 'English, French, Spanish', 'West Sussex, UK', 'Yoga', 'Alice"s Adventures in Wonderland', 1);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Samatar', NULL, 'Axmed', 'samatar26', 'Dutch', 'English, Somali, Dutch', 'Apeldoorn', 'Weightlifting', 'Het lot van de familie Meijer', 4);


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
