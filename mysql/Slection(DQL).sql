// Selection(DQL)
select * from emp ;
select ename, job, sal from emp where job='SALESMAN';
select ename, job, sal, sal*12 ann_sal from emp where sal>=3000;
select * from emp where hiredate = '03-DEC-81';
SELECT * FROM emp WHERE hiredate >= TO_DATE('03-12-81', 'DD-MM-YY');
select * from emp where hiredate > '03-DEC-81'; //is work on sql-10g
SELECT emp.*, sal*6  FROM emp WHERE hiredate = TO_DATE('03-12-81', 'DD-MM-YY');
select * from emp where sal*12 > 25000;

//Operators
-----------------
select * from emp where job != 'CLERK';
select ename, job, sal from emp where sal <=1600;
select emp.*, sal*6 half_term from emp where deptno = 20;
select * from emp where deptno <> 30;

//Arithmetic operator
-----------------------
select ename, job, sal, sal+250 as inc_sal from emp;
select ename, hiredate, hiredate-15 as dec_date from emp where sal<=1100;
select ename, sal, sal*1.1 as inc_sal from emp;
select ename, sal, sal+(sal*10/100) as inc_sal from emp;
select emp.*, sal*0.9 dec_sal from emp;
select ename, sal+comm as payment from emp;
select * from emp where sal = (1500+1000-800 + 300*1);
SELECT * FROM emp WHERE sal = (1500 + 1000 + 800 - 300 * 1);

//Concatination Operation (||)
--------------------------
Select 'Hi ' || ename as Greeting from emp;
select 'Hi '|| ename||', How are you ?' as greet from emp;
select 'Hi ' || ename ||' congrrats your salary '|| sal ||' has incremented to '||(sal+200) as mail from  emp;

//--Logical Operator
------------------
select ename, job, sal from emp where sal>1000 and sal<=2500;
select * from emp where job='CLERK' AND DEPTNO=20 AND SAL<=900;
SELECT * FROM EMP WHERE HIREDATE >=TO_DATE('31-12-80', 'DD-MM-YY') AND HIREDATE<=TO_DATE('01-01-82', 'DD-MM-YY');
SELECT * FROM EMP WHERE ENAME='SMITH' OR ENAME='ALLEN' OR ENAME= 'WARD';
SELECT * FROM EMP WHERE JOB='SALESMAN' OR SAL>3000;
SELECT * FROM EMP WHERE HIREDATE > TO_DATE('31-12-81', 'DD-MM-YY') OR HIREDATE < TO_DATE('01-01-81', 'DD-MM-YY');
SELECT ENAME, JOB, DEPTNO FROM EMP WHERE (JOB='CLERK' OR JOB='SALESMAN') AND DEPTNO=30;
SELECT * FROM EMP WHERE (SAL<1000 OR SAL>1500) AND (JOB='CLERK' OR JOB='SALESMAN');
SELECT * FROM EMP WHERE NOT JOB = 'CLERK';

//Special Operator
-------------------
select * from emp where comm is null;
select ename, mgr from emp where mgr is null;
select ename, comm from emp where comm is not null;
select * from emp where mgr is not null;
select * from emp where JOB in ('MANAGER', 'PRESIDENT', 'ANALYST');
SELECT * FROM EMP WHERE DEPTNO IN(10,30);
SELECT * FROM EMP WHERE DEPTNO IN(10,20) AND JOB IN('MANAGER', 'CLERK');
SELECT * FROM EMP WHERE MGR IN(7739, 7788, 7902) AND COMM IS NULL;
SELECT * FROM EMP WHERE ENAME NOT IN('JONES', 'BLAKE', 'CLARK');

// Between
-------------
SELECT * FROM emp WHERE hiredate BETWEEN TO_DATE('01-01-81', 'DD-MM-YY') AND TO_DATE('31-12-82', 'DD-MM-YY');
Select * from emp where ename between 'ALLEN' and 'SCOTT';
select ename, sal as salary from emp where sal between 1250 and 3000;
select ename, sal from emp where sal not between 1250 and 3000;
select ename from emp where ename not between 'ALLEN' AND 'TURNEL';
SELECT * FROM emp WHERE hiredate NOT BETWEEN TO_DATE('01-01-81', 'DD-MM-YY') AND TO_DATE('31-12-81', 'DD-MM-YY');

// LIKE (%,_)
-------------
SELECT ENAME FROM EMP WHERE ENAME LIKE '%N';
SELECT ENAME FROM EMP WHERE ENAME LIKE '%A%A%';
SELECT * FROM EMP WHERE HIREDATE LIKE '%12%';
SELECT * FROM EMP WHERE ENAME LIKE '_____';
SELECT * FROM EMP WHERE SAL LIKE '___';
SELECT * FROM EMP WHERE ENAME LIKE '_L%';
SELECT * FROM EMP WHERE ENAME LIKE '%M__';
SELECT SAL FROM EMP WHERE SAL LIKE '_2%';
SELECT ENAME FROM EMP WHERE ENAME NOT LIKE 'A%';
SELECT * FROM EMP WHERE JOB NOT LIKE '%MAN%';
SELECT * FROM EMP WHERE ENAME LIKE 'A%' OR ENAME LIKE 'E%' OR ENAME LIKE 'I%' OR ENAME LIKE 'O%' OR ENAME LIKE 'U%';
SELECT * FROM EMP WHERE ENAME NOT LIKE 'A%' AND ENAME NOT LIKE 'E%' AND ENAME NOT LIKE 'I%' AND ENAME NOT LIKE 'O%' and ENAME NOT LIKE 'U%';

//Escape character
-------------------
SELECT * FROM EMP WHERE EMAIL LIKE '%1%%' ESCAPE '1';
SELECT * FROM EMP WHERE EMAIL LIKE '%@_%' ESCAPE '@';

















