CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    passhash TEXT NOT NULL,
    UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS sleep (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    sleepstart timestamptz NOT NULL,
    sleepend timestamptz NOT NULL,
    duration INTEGER,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS activity (
    id SERIAL PRIMARY KEY,
    userId INTEGER,
    name TEXT NOT NULL,
    start timestamptz NOT NULL,
    benefit boolean NOT NULL,
    notes TEXT
);