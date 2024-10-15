CREATE TABLE learning_book (
    ID           NUMBER(5) PRIMARY KEY,
    COURSE       VARCHAR2(20),
    TOPIC        VARCHAR(50),
    COMM      VARCHAR2(11),
    COMPLETED    VARCHAR2(3) DEFAULT 'NO',
    created_at   DATE DEFAULT CURRENT_DATE,
    updated_at   TIMESTAMP DEFAULT SYSTIMESTAMP
);

DESC LEARNING_BOOK;
SELECT * FROM learning_book;
alter table learning_book rename column comm to comments;
ALTER TABLE LEARNING_BOOK MODIFY ID NUMBER(5);
INSERT INTO LEARNING_BOOK ( COURSE, TOPIC, COMMENTS, COMPLETED) VALUES ('REACTJS', 'ALL', NULL, 'NO');
UPDATE learning_book SET Topic = 'Start' WHERE id = 2;
DELETE FROM learning_book WHERE ID = 2;

--MODIFY UPDATE_AT COLUMN IN AUTO UPDATE
CREATE OR REPLACE TRIGGER trg_update_learning_book
BEFORE UPDATE ON learning_book
FOR EACH ROW
BEGIN
    :NEW.updated_at := SYSTIMESTAMP;
END;
 -- Check if ID is NULL; if so, assign a new value from the sequence
CREATE OR REPLACE TRIGGER trg_insert_learning_book
BEFORE INSERT ON learning_book
FOR EACH ROW
BEGIN
    IF :NEW.ID IS NULL THEN
        :NEW.ID := learning_book_seq.NEXTVAL;
    END IF;
END;

TRUNCATE TABLE LEARNING_BOOK;
CREATE SEQUENCE learning_book_seq
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER trg_insert_learning_book
BEFORE INSERT ON learning_book
FOR EACH ROW
BEGIN
    IF :NEW.ID IS NULL THEN
        :NEW.ID := learning_book_seq.NEXTVAL;
    END IF;
END;


commit;



