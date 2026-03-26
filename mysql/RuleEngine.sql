desc ruletable;
select * from ruletable;
commit;
CREATE TABLE ruletable (
    id NUMBER,
    rule VARCHAR2(20) UNIQUE NOT NULL,
    combineRule CLOB,
    details CLOB,
    createdate DATE DEFAULT SYSDATE,
    updatedate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Alter table ruletable add combineRule CLOB;
CREATE SEQUENCE ruletable_id
START WITH 1
INCREMENT BY 1;
CREATE OR REPLACE TRIGGER ruletable_id_trigger
BEFORE INSERT ON ruletable
FOR EACH ROW
WHEN (NEW.id IS NULL)
BEGIN
  SELECT ruletable_id.NEXTVAL INTO :NEW.id FROM dual;
END;
CREATE OR REPLACE TRIGGER UPDATEDATE_trigger
BEFORE UPDATE ON ruletable
FOR EACH ROW
BEGIN
  :NEW.Updatedate := CURRENT_TIMESTAMP;
END;
Insert INTO ruletable (rule, Details) values (upper('dharmic'),upper( 'age > 40'));
UPDATE RULETABLE SET details = UPPER('age > 15 AND age < 40') WHERE ID = 21;
Insert INTO ruletable (RULE, DETAILS) values (UPPER(rule5), upper(translate('(age > 15 AND age < 40)','@()','@')));
INSERT INTO ruletable (RULE, combinerule) 
VALUES (UPPER('rule7'), UPPER('rule1 and rule2'));

select id from RULETABLE where rule='CARTOON';
SELECT ID, RULE, DETAILS FROM RULETABLE WHERE ID =1;
SELECT * FROM RULETABLE;
SELECT * FROM ruletable WHERE rule = 'RULE4';
alter table  ruletable modify rule varchar2(20);
delete from ruletable where id = 123;