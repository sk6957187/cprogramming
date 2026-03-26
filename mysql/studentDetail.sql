// child table of Institute table

create table student (sid number(3) primary key, 
    sname varchar(15) not null, 
    cno number(10) unique check(length(cno)=10),
    sub varchar(10) default 'JAVA',
    DOB date, 
    t_id number(3) references trainer(t_id),
    i_id number(3) references inst_det(i_id)
    );
    
rename student to student_detail;

Alter table student_detail add room_No number(3);

insert into student_detail values (1, 'Sumit', 1234567890, 'JAVA',TO_DATE('03-FEB-02', 'DD-MON-YY'), 2,1,301);
insert into student_detail values (2, 'Mohan', 1233567890, 'SQL',sysdate, 2,1,302);
insert into student_detail values (3, 'Sumit', 1234467890, 'JAVA',sysdate, 1,1,301);