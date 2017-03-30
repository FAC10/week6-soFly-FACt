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

INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Yvonne', '禹彤', 'Liu', 'yvonne-liu', 'American', 'English, Mandarin Chinese, some Italian', 'Taipei, Taiwan', 'Hiking', 'East of Eden', 0);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Finn', 'Webb Newell', 'Hodgkin', 'finnhodgkin', 'British', 'English', 'London, UK', 'Climbing', 'The Lacuna', 2);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Lucy', 'Rose', 'Sabin', 'lucyrose93', 'British', 'English, French, Spanish', 'West Sussex, UK', 'Yoga', 'Alice"s Adventures in Wonderland', 1);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Samatar', NULL, 'Axmed', 'samatar26', 'Dutch', 'English, Somali, Dutch', 'Apeldoorn', 'Weightlifting', 'Het lot van de familie Meijer', 4);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Jessica', 'Ruth', 'Salmon', 'bo-bok', 'British', 'British, Russian', 'England', 'Reading', 'Brothers Karamazov', 0);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Alexis', NULL, 'Lui', 'alexis-l8', 'British', 'English, Cantonese, Spanish, Japanese, Mandarin, Esperanto', 'London', 'Squash', 'Harry Potter', 2);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Alice', 'Eleanor', 'Carr', 'ConchobarMacNessa', 'British/Australian', 'English/Mandarin', 'Australia', 'Drawing', 'Steppenwolf', 2);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Oliver', 'James', 'Phillips', 'oliverjam', 'British', 'English', 'Stevenage, UK', 'JavaScript', 'JavaScript: The Good Parts', 3);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Maja', 'M', 'Kudlicka', 'majakudlicka', 'Polish', 'English, Polish, Broken German, Spanish and French', 'Poland', 'Travelling', 'Harry Potter', 1);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Akin', 'Mariah', 'Sowemimo', 'akin909', 'Estonian', 'English, French', 'UK', 'Coding', 'Love in the Time of Cholera', 2);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Piotr', NULL, 'Berebecki', 'PiotrBerebecki', 'Jamaican', 'English', 'Martian', 'Watering flowers', 'Advanced Watering Flowers Techniques for Beginners', 7);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Joey', 'Louise', 'Scott', 'joeylouise', 'British', 'English, Spanish', 'London', 'Singing', 'In Cold Blood', 1);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Philippa', NULL, 'Bywater', 'pbywater', 'British/Canadian', 'English, French', 'Germany', 'Coding', 'The Famished Road', 1);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Martha', NULL, 'Ciobaniuc', 'smarthutza', 'Romanian', 'English, Romanian, Spanish, German', 'Romania', 'Dancing', 'Too many', 0);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Antonio', NULL, 'Trabalza', 'antoniotrkdz', 'Italian', 'Italian, English', 'Italy', 'LINUX, Coding and Keyboards', 'ABC of Economics', 0);
INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings) VALUES ('Zooey', 'Ben', 'Miller', 'zooeymiller', 'British', 'English', 'Isle of Wight', 'Cycling', 'The Myth of Sisyphus', 1);

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
