create table hos_det(h_id number(3) primary key,
    hname varchar(15) not null,
    loc varchar(15) not null,
    estd date,
    cno number(8) unique
);

rename hos_det to hospital;

insert into hospital values (1, 'PMCH', 'Patna', '15-AUG-1970', 12345678);

Alter table hospital add email varchar(10);
ALTER table hospital modify email varchar(15);

insert into hospital values (2, 'Apollo', 'DElhi', '15-AUG-1990', 12445678,'apollo@gmail');
insert into hospital values (3, 'RIMS', 'RANCHI', '15-AUG-2000', 12348878,'rims@gmail');

commit;


