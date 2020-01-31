CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    passhash TEXT,
    UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS sleep (
    id SERIAL PRIMARY KEY,
    userId INTEGER,
    sleepstart timestamptz,
    sleepend timestamptz,
    duration INTEGER,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS activity (
    id SERIAL PRIMARY KEY,
    userId INTEGER,
    name TEXT,
    start timestamptz,
    benefit boolean
);