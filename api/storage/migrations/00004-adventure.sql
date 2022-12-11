--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE adventure(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        characterId INTEGER,
        created DATETIME,
        updated DATETIME,
        deleted DATETIME,
        FOREIGN KEY (characterId)
            REFERENCES character (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);


INSERT INTO adventure (id, characterId, created, updated, deleted) VALUES
    ('0', '0', '1649035088', '1649035088', NULL),
    ('1', '1', '1649035089', '1649035089', NULL),
    ('2', '2', '1649035104', '1649035104', NULL),
    ('3', '3', '1649035104', '1649035104', NULL),
    ('4', '4', '1649035104', '1649035104', NULL);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE adventure;