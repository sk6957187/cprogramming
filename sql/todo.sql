use essentials;

create table todo (task_id int ,
    task_name varchar(255),
    description varchar(255), 
    is_completed varchar(255),
    PRIMARY KEY(task_id));
 
select * from essentials.todo;

insert into todo(task_id,task_name,description, is_completed) value
    (001, "running", "run in the morning", "5 min");

insert into todo(task_id,task_name,description, is_completed) value
    (002, "jumping", "jump in the pound", "height 10 meter");
insert into todo(task_id,task_name,description, is_completed) value
    (003, "swimming", "swim  inside pound", "30 meter");
insert into todo(task_id,task_name,description, is_completed) value
    (004, "cycling", "cycling in the morning", "10 min");



    yjbhjgj