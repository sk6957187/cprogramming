desc WeatherAlerts;
desc DailyWeatherSummary;
desc WeatherData;
select * from WeatherData;
ALTER TABLE WeatherData
ADD (
    pressure NUMBER,
    humidity NUMBER,
    sea_level NUMBER,
    visibility NUMBER,
    wind_speed NUMBER
);
alter table weatherdata drop (pressure,
    humidity,
    sea_level,
    visibility,
    wind_speed) ;

ALTER TABLE weatherData DROP COLUMN ADDED_DATE;
SELECT AVG(TEMP_CELSIUS) AS avg_temp, MAX(TEMP_CELSIUS) AS max_temp, MIN(TEMP_CELSIUS) AS min_temp
FROM weatherData
WHERE CITY = 'PATNA' AND Added_time >= TRUNC(SYSDATE);
select AVG(TEMP_CELSIUS) AS avg_temp from 
SELECT AVG(TEMP_CELSIUS) AS avg_temp, MAX(TEMP_CELSIUS) AS max_temp, MIN(TEMP_CELSIUS) AS min_temp, CONDITION FROM weatherData
WHERE CITY = 'PATNA' AND Added_time >= TRUNC(SYSDATE)
GROUP BY CONDITION;
SELECT AVG(TEMP_CELSIUS) AS avg_temp, MAX(TEMP_CELSIUS) AS max_temp, MIN(TEMP_CELSIUS) AS min_temp FROM weatherData;

create table WeatherData(
    id number ,
    city VARCHAR2(50) NOT NULL,
    temp_celsius NUMBER(5, 2),
    feels_like_celsius NUMBER(5, 2),
    condition VARCHAR2(50),
    Added_time TIMESTAMP
);
update WeatherData set City ='DELHI' where city = 'Delhi';
drop table WeatherData purge;
desc WeatherData;
CREATE SEQUENCE weatherdata_id
START WITH 1
INCREMENT BY 1;
CREATE OR REPLACE TRIGGER weatherdata_id_trigger
BEFORE INSERT ON WeatherData
FOR EACH ROW
WHEN (NEW.id IS NULL)
BEGIN
  SELECT weatherdata_id.NEXTVAL INTO :NEW.id FROM dual;
END;
CREATE OR REPLACE TRIGGER update_time_trigger
BEFORE UPDATE ON weatherdata
FOR EACH ROW
BEGIN
  :NEW.Update_time:= CURRENT_TIMESTAMP;
END;
desc weatherdata;
select * from weatherdata;
ALTER TABLE weatherdata RENAME COLUMN sno TO id;


CREATE TABLE DailyWeatherSummary (
    sno NUMBER,
    city VARCHAR2(50) NOT NULL,
    avg_temp NUMBER(5, 2),
    max_temp NUMBER(5, 2),
    min_temp NUMBER(5, 2),
    dominant_condition VARCHAR2(50),
    summary_date DATE default sysdate,
    update_time TIMESTAMP default CURRENT_TIMESTAMP
);
INSERT INTO WeatherData (city, temp_celsius, feels_like_celsius, condition, Added_time)
VALUES ('PATNA', 33.96, 40.96, 'Haze', TO_TIMESTAMP('1970-01-01', 'YYYY-MM-DD') + NUMTODSINTERVAL(1729237892, 'SECOND'));

ALTER TABLE DailyWeatherSummary RENAME COLUMN sno TO id;

CREATE SEQUENCE DailyWeatherSummary_sno_seq
START WITH 1
INCREMENT BY 1;
CREATE OR REPLACE TRIGGER DailyWeatherSummary_sno_trigger
BEFORE INSERT ON DailyWeatherSummary
FOR EACH ROW
WHEN (NEW.SNO IS NULL)
BEGIN
  SELECT DailyWeatherSummary_sno_seq.NEXTVAL INTO :NEW.SNO FROM dual;
END;
CREATE OR REPLACE TRIGGER DailyWeatherSummary_update_time_trigger
BEFORE UPDATE ON DailyWeatherSummary
FOR EACH ROW
BEGIN
  :NEW.UPDATE_TIME := CURRENT_TIMESTAMP;
END;
desc DailyWeatherSummary;
select * from DailyWeatherSummary;

CREATE TABLE DailyWeatherSummary (
    id NUMBER 
    city VARCHAR2(50) NOT NULL,
    avg_temp NUMBER(5, 2),
    max_temp NUMBER(5, 2),
    min_temp NUMBER(5, 2),
    dominant_condition VARCHAR2(50),
    summary_date DATE NOT NULL
);
desc DailyWeatherSummary;
truncate table DailyWeatherSummary;
alter table DailyWeatherSummary rename column SUMMARY_DATE to added_date;
alter table  DailyWeatherSummary modify added_date number;
alter table DailyWeatherSummary add  added_date number;
CREATE TABLE WeatherAlerts (
    id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    city VARCHAR2(50) NOT NULL,
    alert_message VARCHAR2(255),
    alert_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from WeatherData;

SELECT AVG(TEMP_CELSIUS), max(TEMP_CELSIUS), min(TEMP_CELSIUS), condition FROM weatherData 
WHERE city = delhi ;
SELECT AVG(TEMP_CELSIUS) AS avg_temp, MAX(TEMP_CELSIUS) AS max_temp, MIN(TEMP_CELSIUS) AS min_temp, CONDITION FROM weatherData WHERE CITY = 'Delhi' GROUP BY CONDITION;

commit;



