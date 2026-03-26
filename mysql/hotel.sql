create table hotel(hid number(3) primary key,
    hname varchar(10) not null,
    cno number(8) not null, 
    loc varchar(10) default 'INDIA',
    closingT TIMESTAMP
);