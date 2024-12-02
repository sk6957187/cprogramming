select * from tab;
CREATE table bank (bid number(3) primary key,
    BANKNUMBER VARCHAR(10) NOT NULL,
    LOC VARCHAR(10),
    CNO NUMBER(10) UNIQUE CHECK(LENGTH(CNO)=10),
    ESTD DATE
);
