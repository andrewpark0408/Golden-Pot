-- Drop tables if they exist
DROP TABLE IF EXISTS MlbPicks;
DROP TABLE IF EXISTS MlbGames;
DROP TABLE IF EXISTS MlbPlayers;
DROP TABLE IF EXISTS NbaPicks;
DROP TABLE IF EXISTS NbaGames;
DROP TABLE IF EXISTS NbaPlayers;
DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS Users;

-- Common tables for MLB 
CREATE TABLE IF NOT EXISTS Teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- MLB-specific tables
CREATE TABLE IF NOT EXISTS MlbPlayers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    team_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES Teams(id)
);

CREATE TABLE IF NOT EXISTS MlbGames (
    id SERIAL PRIMARY KEY,
    home_team VARCHAR(255) NOT NULL,
    away_team VARCHAR(255) NOT NULL,
    game_date TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS MlbPicks (
    id SERIAL PRIMARY KEY,
    home_team VARCHAR(255) NOT NULL,
    away_team VARCHAR(255) NOT NULL,
    game_date TIMESTAMP NOT NULL,
    player_type VARCHAR(50) NOT NULL,
    player_name VARCHAR(255) NOT NULL,
    strikeouts INT,
    walks INT,
    strikes INT,
    single INT,
    double INT,
    triple INT,
    home_runs INT,
    game_id INT, -- Added the game_id column
    FOREIGN KEY (game_id) REFERENCES MlbGames(id)
);

-- -- NBA-specific tables
-- CREATE TABLE IF NOT EXISTS NbaPlayers (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     team_id INT NOT NULL,
--     FOREIGN KEY (team_id) REFERENCES Teams(id)
-- );

-- CREATE TABLE IF NOT EXISTS NbaGames (
--     id SERIAL PRIMARY KEY,
--     home_team VARCHAR(255) NOT NULL,
--     away_team VARCHAR(255) NOT NULL,
--     game_date TIMESTAMP NOT NULL,
--     location VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS NbaPicks (
--     id SERIAL PRIMARY KEY,
--     game_id INT NOT NULL,
--     home_team VARCHAR(255) NOT NULL,
--     away_team VARCHAR(255) NOT NULL,
--     game_date TIMESTAMP NOT NULL,
--     player_type VARCHAR(50) NOT NULL,
--     player_name VARCHAR(255) NOT NULL,
--     points INT,
--     assists INT,
--     rebounds INT,
--     blocks INT,
--     FOREIGN KEY (game_id) REFERENCES NbaGames(id)
-- );
