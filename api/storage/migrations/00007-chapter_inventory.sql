--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE chapter_inventory(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chapterId INTEGER,
        inventoryId INTEGER,
        quantity INTEGER,
        initial BOOLEAN,
        created DATETIME,
        updated DATETIME,
        deleted DATETIME,
        UNIQUE (chapterId, inventoryId, initial),
        FOREIGN KEY (chapterId)
            REFERENCES chapter (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION,
        FOREIGN KEY (inventoryId)
            REFERENCES inventory (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

INSERT INTO chapter_inventory (chapterId, inventoryId, quantity, initial, created, updated, deleted) VALUES
('0', '1', '50', 'true', '1654357193', '1654357193', NULL),
('0', '1', '25', 'false', '1654357193', '1654357193', NULL),
('0', '5', '50', 'true', '1654357193', '1654357193', NULL),
('0', '5', '25', 'false', '1654357193', '1654357193', NULL),
('1', '1', '50', 'true', '1654357193', '1654357193', NULL),
('1', '1', '25', 'false', '1654357193', '1654357193', NULL),
('1', '5', '50', 'true', '1654357193', '1654357193', NULL),
('1', '5', '25', 'false', '1654357193', '1654357193', NULL),
('2', '1', '50', 'true', '1654357193', '1654357193', NULL),
('2', '1', '25', 'false', '1654357193', '1654357193', NULL),
('2', '5', '50', 'true', '1654357193', '1654357193', NULL),
('2', '5', '25', 'false', '1654357193', '1654357193', NULL),
('2', '3', '5', 'true', '1654357193', '1654357193', NULL),
('0', '2', '30', 'true', '1654357193', '1654357193', NULL),
('0', '2', '3', 'false', '1654357193', '1654357193', NULL);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE chapter_inventory;