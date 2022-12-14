--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE event_server_arenastart(
        eventId INTEGER PRIMARY KEY AUTOINCREMENT,
        created DATETIME,
        updated DATETIME,
        deleted DATETIME, 
        start DATETIME, 
        end DATETIME,         
        UNIQUE (eventId),
        FOREIGN KEY (eventId)
            REFERENCES event (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

CREATE TABLE event_server_arenaend(
    eventId INTEGER PRIMARY KEY AUTOINCREMENT,
    created DATETIME,
    updated DATETIME,
    deleted DATETIME,        
    UNIQUE (eventId),
    FOREIGN KEY (eventId)
        REFERENCES event (id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE event_server_arenastart;
DROP TABLE event_server_arenaend;