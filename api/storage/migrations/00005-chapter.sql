--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE chapter(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        storyId INTEGER,
        adventureId INTEGER,
        mode STRING,
        chapterName STRING,
        storyName STRING,
        energy INTEGER,
        created DATETIME,
        updated DATETIME,
        deleted DATETIME,
        FOREIGN KEY (adventureId)
            REFERENCES adventure (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

INSERT INTO chapter (id, storyId, adventureId, mode, energy, storyName, chapterName, created, updated, deleted) VALUES
    ('0', '0', '0', 'run', '5', 'Jade Story', 'Jade Story 0 0 1', '1649035088', '1649035088', NULL),
    ('1', '0', '0', 'run', '5', 'Jade Story', 'Jade Story 0 0 2', '1649035088', '1649035088', NULL),
    ('2', '0', '0', 'run', '5', 'Jade Story', 'Jade Story 0 0 3', '1649035088', '1649035088', NULL),
    ('3', '0', '0', 'run', '5', 'Jade Story', 'Jade Story 0 0 4', '1649035088', '1649035088', NULL),
    ('4', '0', '0', 'run', '5', 'Jade Story', 'Jade Story 0 0 5', '1649035088', '1649035088', NULL),
    ('5', '0', '0', 'run', '5', 'Jade Story', 'Jade Story 0 0 6', '1649035088', '1649035088', NULL),
    ('6', '0', '0', 'run', '5', 'Jade Story', 'Jade Story 0 0 7', '1649035088', '1649035088', NULL),
    ('7', '0', '0', 'run', '5', 'Jade Story', 'Jade Story 0 0 8', '1649035088', '1649035088', NULL),
    ('8', '0', '0', 'run', '5', 'Jade Story', 'Jade Story 0 0 9', '1649035088', '1649035088', NULL),
    ('9', '0', '0', 'run', '5', 'Jade Story', 'Jade Story 0 0 10', '1649035088', '1649035088', NULL),
    ('10', '1', '0', 'run', '5', 'Jade Side', 'Jade Side 0 1 1', '1649035088', '1649035088', NULL),
    ('11', '1', '0', 'run', '5', 'Jade Side', 'Jade Side 0 1 2', '1649035088', '1649035088', NULL),
    ('12', '1', '0', 'run', '5', 'Jade Side', 'Jade Side 0 1 3', '1649035088', '1649035088', NULL),
    ('13', '1', '0', 'run', '5', 'Jade Side', 'Jade Side 0 1 4', '1649035088', '1649035088', NULL),
    ('14', '1', '0', 'run', '5', 'Jade Side', 'Jade Side 0 1 5', '1649035088', '1649035088', NULL),
    ('15', '1', '0', 'run', '5', 'Jade Side', 'Jade Side 0 1 6', '1649035088', '1649035088', NULL),
    ('16', '2', '1', 'run', '5', 'Garnet Story', 'Garnet Story 1 2 1', '1649035088', '1649035088', NULL),
    ('17', '2', '1', 'run', '5', 'Garnet Story', 'Garnet Story 1 2 2', '1649035088', '1649035088', NULL),
    ('18', '2', '1', 'run', '5', 'Garnet Story', 'Garnet Story 1 2 3', '1649035088', '1649035088', NULL),
    ('19', '2', '1', 'run', '5', 'Garnet Story', 'Garnet Story 1 2 4', '1649035088', '1649035088', NULL),
    ('20', '2', '1', 'run', '5', 'Garnet Story', 'Garnet Story 1 2 5', '1649035088', '1649035088', NULL),
    ('21', '2', '1', 'run', '5', 'Garnet Story', 'Garnet Story 1 2 6', '1649035088', '1649035088', NULL),
    ('22', '2', '1', 'run', '5', 'Garnet Story', 'Garnet Story 1 2 7', '1649035088', '1649035088', NULL),
    ('23', '2', '1', 'run', '5', 'Garnet Story', 'Garnet Story 1 2 8', '1649035088', '1649035088', NULL),
    ('24', '2', '1', 'run', '5', 'Garnet Story', 'Garnet Story 1 2 9', '1649035088', '1649035088', NULL),
    ('25', '2', '1', 'run', '5', 'Garnet Story', 'Garnet Story 1 2 10', '1649035088', '1649035088', NULL),
    ('26', '3', '1', 'run', '5', 'Garnet Side', 'Garnet Side 1 3 1', '1649035088', '1649035088', NULL),
    ('27', '3', '1', 'run', '5', 'Garnet Side', 'Garnet Side 1 3 2', '1649035088', '1649035088', NULL),
    ('28', '3', '1', 'run', '5', 'Garnet Side', 'Garnet Side 1 3 3', '1649035088', '1649035088', NULL),
    ('29', '3', '1', 'run', '5', 'Garnet Side', 'Garnet Side 1 3 4', '1649035088', '1649035088', NULL),
    ('30', '3', '1', 'run', '5', 'Garnet Side', 'Garnet Side 1 3 5', '1649035088', '1649035088', NULL),
    ('31', '4', '2', 'run', '5', 'Obsidian Story', 'Obsidian Story 2 4 1', '1649035088', '1649035088', NULL),
    ('32', '4', '2', 'run', '5', 'Obsidian Story', 'Obsidian Story 2 4 2', '1649035088', '1649035088', NULL),
    ('33', '4', '2', 'run', '5', 'Obsidian Story', 'Obsidian Story 2 4 3', '1649035088', '1649035088', NULL),
    ('34', '4', '2', 'run', '5', 'Obsidian Story', 'Obsidian Story 2 4 4', '1649035088', '1649035088', NULL),
    ('35', '4', '2', 'run', '5', 'Obsidian Story', 'Obsidian Story 2 4 5', '1649035088', '1649035088', NULL),
    ('36', '4', '2', 'run', '5', 'Obsidian Story', 'Obsidian Story 2 4 6', '1649035088', '1649035088', NULL),
    ('37', '4', '2', 'run', '5', 'Obsidian Story', 'Obsidian Story 2 4 7', '1649035088', '1649035088', NULL),
    ('38', '4', '2', 'run', '5', 'Obsidian Story', 'Obsidian Story 2 4 8', '1649035088', '1649035088', NULL),
    ('39', '4', '2', 'run', '5', 'Obsidian Story', 'Obsidian Story 2 4 9', '1649035088', '1649035088', NULL),
    ('40', '5', '2', 'run', '5', 'Obsidian Side', 'Obsidian Side 2 5 1', '1649035088', '1649035088', NULL),
    ('41', '5', '2', 'run', '5', 'Obsidian Side', 'Obsidian Side 2 5 2', '1649035088', '1649035088', NULL),
    ('42', '5', '2', 'run', '5', 'Obsidian Side', 'Obsidian Side 2 5 3', '1649035088', '1649035088', NULL),
    ('43', '5', '2', 'run', '5', 'Obsidian Side', 'Obsidian Side 2 5 4', '1649035088', '1649035088', NULL),
    ('44', '5', '2', 'run', '5', 'Obsidian Side', 'Obsidian Side 2 5 5', '1649035088', '1649035088', NULL),
    ('45', '6', '3', 'run', '5', 'Moonstone Story', 'Moonstone Story 3 6 1', '1649035088', '1649035088', NULL),
    ('46', '6', '3', 'run', '5', 'Moonstone Story', 'Moonstone Story 3 6 2', '1649035088', '1649035088', NULL),
    ('47', '6', '3', 'run', '5', 'Moonstone Story', 'Moonstone Story 3 6 3', '1649035088', '1649035088', NULL),
    ('48', '6', '3', 'run', '5', 'Moonstone Story', 'Moonstone Story 3 6 4', '1649035088', '1649035088', NULL),
    ('49', '6', '3', 'run', '5', 'Moonstone Story', 'Moonstone Story 3 6 5', '1649035088', '1649035088', NULL),
    ('50', '6', '3', 'run', '5', 'Moonstone Story', 'Moonstone Story 3 6 6', '1649035088', '1649035088', NULL),
    ('51', '6', '3', 'run', '5', 'Moonstone Story', 'Moonstone Story 3 6 7', '1649035088', '1649035088', NULL),
    ('52', '6', '3', 'run', '5', 'Moonstone Story', 'Moonstone Story 3 6 8', '1649035088', '1649035088', NULL),
    ('53', '6', '3', 'run', '5', 'Moonstone Story', 'Moonstone Story 3 6 9', '1649035088', '1649035088', NULL),
    ('54', '7', '3', 'run', '5', 'Moonstone Side', 'Moonstone Side 3 7 1', '1649035088', '1649035088', NULL),
    ('55', '7', '3', 'run', '5', 'Moonstone Side', 'Moonstone Side 3 7 2', '1649035088', '1649035088', NULL),
    ('56', '7', '3', 'run', '5', 'Moonstone Side', 'Moonstone Side 3 7 3', '1649035088', '1649035088', NULL),
    ('57', '7', '3', 'run', '5', 'Moonstone Side', 'Moonstone Side 3 7 4', '1649035088', '1649035088', NULL),
    ('58', '7', '3', 'run', '5', 'Moonstone Side', 'Moonstone Side 3 7 5', '1649035088', '1649035088', NULL),
    ('59', '8', '4', 'run', '5', 'Amber Story', 'Amber Story 4 8 1', '1649035088', '1649035088', NULL),
    ('60', '8', '4', 'run', '5', 'Amber Story', 'Amber Story 4 8 2', '1649035088', '1649035088', NULL),
    ('61', '8', '4', 'run', '5', 'Amber Story', 'Amber Story 4 8 3', '1649035088', '1649035088', NULL),
    ('62', '9', '4', 'run', '5', 'Amber Side', 'Amber Side 4 9 1', '1649035088', '1649035088', NULL),
    ('63', '9', '4', 'run', '5', 'Amber Side', 'Amber Side 4 9 2', '1649035088', '1649035088', NULL),
    ('64', '9', '4', 'run', '5', 'Amber Side', 'Amber Side 4 9 3', '1649035088', '1649035088', NULL);
--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE chapter;