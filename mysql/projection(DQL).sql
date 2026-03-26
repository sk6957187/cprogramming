// Project in DQL
// syntax:- select */columnName/distinct columnName/ Expression/ Alias/ TableName.* from tableName;

//Asterisk(*)
---------------
select * from emp;
select * from Doctor;

//ColumnName
--------------
select ename, job, sal ,hiredate from emp;
select ename, deptno from emp;

//Distinct column (unique record)
----------------------------------
select DISTINCT job from emp;
select DISTINCT deptno from emp;
select DISTINCT  deptno, job from emp;
select UNIQUE deptno from emp;
select UNIQUE deptno, job from emp;

//Expression
--------------
select ename, job, sal, sal*12 from emp;
select ename , sal, sal/2 from emp;

//Alias
--------
select ename as emp_name from emp;
select empno, ename as emp_name, sal salary from emp;

//TableName.*
-------------
select emp.*, sal*12 ann_sal from emp;
select emp.*, sal+200 inc_sal, sal-100 dec_sal from emp;
commit;





