--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE character(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name STRING,
        weaponId INTEGER,
        inventoryId INTEGER,
        created DATETIME,
        updated DATETIME,
        deleted DATETIME,
        FOREIGN KEY (inventoryId)
            REFERENCES inventory (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION,
        FOREIGN KEY (weaponId)
            REFERENCES weapon (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

INSERT INTO character (id, name, weaponId, inventoryId, created, updated, deleted) VALUES
    ('0', 'Sayuri', '0', '5', '1649035088', '1649035088', NULL),
    ('1', 'Nell', '1', '6', '1649035089', '1649035089', NULL),
    ('2', 'Ichiro', '2', '7', '1649035089', '1649035089', NULL),
    ('3', 'Akemi', '3', '8', '1649035089', '1649035089', NULL),
    ('4', 'Diane', '4', '9', '1649035104', '1649035104', NULL);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE character;