desc daily_report;
select * from daily_report;
CREATE TABLE daily_report(
  SNO            NUMBER(5),
  START_DATE     VARCHAR2(15),
  USERID         VARCHAR2(50),
  SUB            VARCHAR2(50),
  TOPIC          VARCHAR2(50),
  TOPIC_DETAILS  CLOB,
  COMPLETED      CHAR(3),
  ADDED_DATE     DATE DEFAULT SYSDATE,
  UPDATE_TIME    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted         VARCHAR2(3) DEFAULT 'NO'
);
CREATE SEQUENCE daily_report_sno_seq
START WITH 1
INCREMENT BY 1;
CREATE OR REPLACE TRIGGER daily_report_sno_trigger
BEFORE INSERT ON daily_report
FOR EACH ROW
WHEN (NEW.SNO IS NULL)
BEGIN
  SELECT daily_report_sno_seq.NEXTVAL INTO :NEW.SNO FROM dual;
END;
CREATE OR REPLACE TRIGGER update_time_trigger
BEFORE UPDATE ON daily_report
FOR EACH ROW
BEGIN
  :NEW.UPDATE_TIME := CURRENT_TIMESTAMP;
END;

truncate table daily_report;
alter table  daily_report modify completed char(3) default 'NO';
insert into daily_report(start_date, userId, sub, Topic, Topic_Details, completed) values('25-AUG-2024', 'SUMIT0009', 'SQL', 'DATA CONTROLE', 'ALL', 'YES');
commit;

SELECT CONSTRAINT_NAME 
FROM USER_CONSTRAINTS 
WHERE TABLE_NAME = 'DAILY_REPORT' AND CONSTRAINT_TYPE = 'P';
ALTER TABLE daily_report DROP PRIMARY KEY;
Alter table daily_report add delete varchar2(3) default 'NO';

ALTER TABLE daily_report 
RENAME COLUMN is_deleted TO deleted;


ALTER TABLE daily_report ADD "DELETE" VARCHAR2(3) DEFAULT 'NO';


SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE 
FROM USER_CONSTRAINTS 
WHERE TABLE_NAME = 'DAILY_REPORT';
ALTER TABLE daily_report MODIFY SNO NUMBER(5);
delete daily_report where userid='ghjkk';
