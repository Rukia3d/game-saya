--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE chapter(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        storyId INTEGER,
        mode STRING,
        name STRING,
        energy INTEGER,
        created DATETIME,
        updated DATETIME,
        deleted DATETIME);

INSERT INTO chapter (id, storyId, mode, energy, name, created, updated, deleted) VALUES
    ('0', '0', 'run', '5', 'Lake', '1649035088', '1649035088', NULL),
    ('1', '0', 'run', '5', 'Shore', '1649035088', '1649035088', NULL),
    ('2', '0', 'run', '5', 'Wood path', '1649035088', '1649035088', NULL);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE chapter;