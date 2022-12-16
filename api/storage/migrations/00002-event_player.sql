--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE event_player_createplayer(
        eventId INTEGER PRIMARY KEY AUTOINCREMENT,
        playerId INTEGER,
        playerName STRING,
        UNIQUE (eventId),
        FOREIGN KEY (eventId)
            REFERENCES event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

CREATE TABLE event_player_startlevel(
        eventId INTEGER PRIMARY KEY AUTOINCREMENT,
        playerId INTEGER,
        adventureId INTEGER,
        chapterId INTEGER,
        storyId INTEGER,          
        UNIQUE (eventId),
        FOREIGN KEY (eventId)
            REFERENCES event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

CREATE TABLE event_player_winlevel(
        eventId INTEGER PRIMARY KEY AUTOINCREMENT,
        playerId INTEGER,
        adventureId INTEGER,
        chapterId INTEGER,
        storyId INTEGER,          
        UNIQUE (eventId),
        FOREIGN KEY (eventId)
            REFERENCES event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

CREATE TABLE event_player_arenastart(
        eventId INTEGER PRIMARY KEY AUTOINCREMENT,
        playerId INTEGER,
        mode INTEGER,
        id INTEGER,         
        UNIQUE (eventId),
        FOREIGN KEY (eventId)
            REFERENCES event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

CREATE TABLE event_player_arenaend(
        eventId INTEGER PRIMARY KEY AUTOINCREMENT,
        playerId INTEGER,
        mode INTEGER,
        id INTEGER,         
        UNIQUE (eventId),
        FOREIGN KEY (eventId)
            REFERENCES event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

CREATE TABLE event_player_claimreward(
        eventId INTEGER PRIMARY KEY AUTOINCREMENT,
        playerId INTEGER,
        claimId INTEGER,         
        UNIQUE (eventId),
        FOREIGN KEY (eventId)
            REFERENCES event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);


INSERT INTO event_player_createplayer (eventId, playerId, playerName) VALUES
    ('0', '0', 'Test Player');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE event_player_createplayer;
DROP TABLE event_player_startlevel;
DROP TABLE event_player_winlevel;