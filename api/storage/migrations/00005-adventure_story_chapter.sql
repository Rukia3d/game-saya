--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE adventure_story_chapter(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        adventureId INTEGER,
        storyId INTEGER,
        chapterId INTEGER,
        name STRING,
        created DATETIME,
        updated DATETIME,
        deleted DATETIME,
        UNIQUE (adventureId, storyId, chapterId),
        FOREIGN KEY (adventureId)
            REFERENCES adventure (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION,
        FOREIGN KEY (chapterId)
            REFERENCES chapter (id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

INSERT INTO adventure_story_chapter (chapterId, storyId, adventureId, name, created, updated, deleted) VALUES
    ('0', '0', '0', 'Chapter 0 of Story 0', '1649035088', '1649035088', NULL),
    ('0', '0', '1', 'Chapter 1 of Story 0', '1649035088', '1649035088', NULL),
    ('0', '0', '2', 'Chapter 2 of Story 0', '1649035088', '1649035088', NULL);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE adventure_story_chapter;