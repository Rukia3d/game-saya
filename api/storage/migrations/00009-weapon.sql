--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE weapon(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name STRING,
        created DATETIME,
        updated DATETIME,
        deleted DATETIME);

INSERT INTO weapon (id, name, created, updated, deleted) VALUES
    ('0', 'Chakram', '1649035088', '1649035088', NULL),
    ('1', 'Longsword', '1649035089', '1649035089', NULL),
    ('2', 'Scythe', '1649035089', '1649035089', NULL),
    ('3', 'Scroll', '1649035089', '1649035089', NULL),
    ('4', 'Daggers', '1649035104', '1649035104', NULL);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE weapon;