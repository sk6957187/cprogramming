select * from studentsql;
desc studentsql;
show user;
create table StudentSQL (sId number(5), sroll char(5) primary key, sname varchar(20) not null, email varchar(50), photo VARCHAR(100));
DROP SEQUENCE StudentSQL_Seq;
CREATE SEQUENCE StudentSQL_Seq
START WITH 1
INCREMENT BY 1
NOCACHE;

CREATE OR REPLACE TRIGGER StudentSQL_BI
BEFORE INSERT ON StudentSQL
FOR EACH ROW
BEGIN
    :NEW.sId := StudentSQL_Seq.NEXTVAL;
END;

CREATE OR REPLACE TRIGGER StudentSQL_BI
BEFORE INSERT ON StudentSQL
FOR EACH ROW
BEGIN
    :NEW.sId := StudentSQL_Seq.NEXTVAL;
END;

INSERT INTO StudentSQL (sroll, sname, email, photo)
VALUES ('222', 'John Doe', 'john.doe@example.com', 'photo.jpg');
