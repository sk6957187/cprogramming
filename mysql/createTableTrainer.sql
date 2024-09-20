//child table of inst_det
create table trainner (t_id number(3) primary key,
    t_name varchar(15) not null,
    sub varchar(15) default 'JAVA',
    salary number(8,2) check(salary >=10000),
    i_id number(3) references inst_det(i_id));
    
rename trainner to trainer;

insert into TRAINER values(1,'Aman','JAVA',40000,3);
insert into TRAINER values(2,'Abhishek', 'SQL', 30000,1);

commit;