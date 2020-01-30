CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    passhash TEXT,
    UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS sleep (
    id SERIAL PRIMARY KEY,
    userId INTEGER,
    sleepDate date,
    start timestamptz,
    wake timestamptz,
    duration time,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS activity (
    id SERIAL PRIMARY KEY,
    userId INTEGER,
    actDate date,
    name TEXT,
    start timestamptz,
    benefit boolean,
    duration time
);