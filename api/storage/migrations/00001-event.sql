--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE event(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type VARCHAR,
        created DATETIME,
        updated DATETIME,
        deleted DATETIME,
        UNIQUE (id, type, created));

INSERT INTO event (id, type, created, updated, deleted) VALUES
    ('0', 'CREATEPLAYER', '1649035088', '1649035088', NULL);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE event;