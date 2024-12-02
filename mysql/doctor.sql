// child table of hospital
create table doctor (d_id number(3) Primary key,
    d_name varchar(10) not null,
    cno number(10) CHECK(length(cno)=10),
    salary number(8,2),
    spcl_in varchar(15) default'Junior',
    doj date,
    h_id number(3) references hospital(h_id)
);

insert into doctor values (1,'Sumit', 1234567890, 60000,'cardiac', '17-sep-24',1);
INSERT INTO doctor (d_id, d_name, cno, salary, spcl_in, doj, h_id) VALUES (2, 'Mohan', 1266567890, 50000, 'Dentist', '18-SEP-24', 2);
INSERT INTO doctor (d_id, d_name, cno, spcl_in, doj, h_id) VALUES (3, 'Aman', 1266577890, 'Dentist', null, 3);
INSERT INTO doctor (d_id, d_name, cno, salary,  doj, h_id) VALUES (4, 'Manik',8126687890, 40000, sysdate, 2);

select * from doctor;