--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE inventory(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name STRING,
        created DATETIME,
        updated DATETIME,
        deleted DATETIME);

INSERT INTO inventory (id, name, created, updated, deleted) VALUES
    ('0', 'energy', '1649035088', '1649035088', NULL),
    ('1', 'gold', '1649035089', '1649035089', NULL),
    ('2', 'experience', '1649035089', '1649035089', NULL),
    ('3', 'blackstone', '1649035089', '1649035089', NULL),
    ('4', 'whitestone', '1649035104', '1649035104', NULL),
    ('5', 'jade', '1649035104', '1649035104', NULL),
    ('6', 'garnet', '1649035104', '1649035104', NULL),
    ('7', 'obsidian', '1649035104', '1649035104', NULL),
    ('8', 'moonstone', '1649035104', '1649035104', NULL),
    ('9', 'amber', '1649035104', '1649035104', NULL);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE inventory;