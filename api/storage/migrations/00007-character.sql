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
    ('0', 'Jade', '0', '5', '1649035088', '1649035088', NULL),
    ('1', 'Garnet', '1', '6', '1649035089', '1649035089', NULL),
    ('2', 'Obsidian', '2', '7', '1649035089', '1649035089', NULL),
    ('3', 'Moonstone', '3', '8', '1649035089', '1649035089', NULL),
    ('4', 'Amber', '4', '9', '1649035104', '1649035104', NULL);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE character;