create table inst_det(i_id number(3) primary key, 
    I_name varchar(15) not null, 
    loc varchar(15) not null,
    estd date, 
    cont number(10) not null check(length(cont)=10));
    
insert into inst_det values(1, 'HIT', 'Haldia', '22-JUN-1996', 1334567890);
insert into inst_det values(2, 'Jspider', 'BTM', '20-JAN-17', 1234567890);
insert into inst_det values(3, 'JLC', 'BTM', '05-SEP-1999', 1234567898);
insert into inst_det(i_id,I_name,loc,cont) values(4, 'Qspider', 'BTM', 1235675643);

commit;
select * from inst_det;
select i_id from inst_det;