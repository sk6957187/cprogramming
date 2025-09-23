## Seen the file in Windows command line
---------------------------------------------------------------------------------------------
first type in "file name" (partision name A/B/c)
and again "cd file name"
show the file in folder type "dir"

command line back "cd .."

deleted latter is return by “command+z”/“command+shift+z”

Deleted by “command+z”

--> Directary path --
			C:\git-access
## Add to git
------------------------------------------------------------------------------------------------------
git diff dictionary.c (check what is updated in file)
git add dictionary.c (dictionary.c is file name)
git add -u      //all file in 
git reset -- main/dontcheckmein.txt     //for ignoring or use .gitignor
git commit -m "adding dictionary"
git push origin master
when not pushed then use the git push link(open GitHub and past repojectari link) master. 
repojectari:- https://github.com/sk6957187/cprogramming.git

git rm --cached MyFolder/myyfile.txt     //remove the file from the repository but keep it locally

sk6957187
Sumit@102
1. git status 

## C-PROGRAM RUN ON CMD
------------------------------------------------------
1. GO FILE DIRECTRY
2. COMPILE THROUGTH:- gcc sum.c
3. run:- a.exe

## Java-PROGRAM RUN ON CMD
----------------------------------------------------------
1. go to file
2. Compile file “javac FILENAME.java”
3. file run “java FILENAME”

## Python Command
-------------------------------------------------------------------------------------
python -m SimpleHTTPServer 8000
python -m http.server 8000

## Program run on localhost
--------------------------------------------------------------
run -> run/edit/debug configuration 
setup-->
name -> Test
main class -> com.project.Test //test is file name
program arguments -> server


## Oracle Sql
---------------------------------------------------------------------------
when come  "TNS-12560: TNS:protocol adapter error"

1. lsnrctl services
2. lsnrctl  start
3.lsnrctl  status

check hostname and port
--> lsnrctl  status

## MongoDB
-----------------------------------------------------------------------------------
Run MongoDB on the window: mongosh
show data- show dbs
test> use school //Switch to db school (1st check school file then not found create school file)
school> db.student.insertOne({"name":"Sumit", "age":22})
	db.student.insertOne({"name":"Sumit Kumar", "age":22, "mob.no": 9955})
//data shown in a file
-> db.student.find()

//data delete
-> db.student.deleteMany({})

## MySQL
-----------------------------------------------------------------------------------
show databases;
use sumitdb;
show tables;
desc student;
create table student(roll_num varchar(20), name varchar(64));
INSERT INTO student (roll_num, name) VALUES ('181', 'Sumit Kumar');
SELECT * FROM student where roll_num="177" limit 1;
select * from student;
ALTER table student modify column roll_num varchar(20) not null unique;
UPDATE student set roll_num = "178" where roll_num = "177" limit 1;
ALTER TABLE student ADD s_no int not null unique AUTO_INCREMENT FIRST;
delete from student where roll_num="178";

--------------------------------------------------------------------
To build project -->
	mvn clean install (java file)
	npm run build (react file)
	npx create-react-app hello (create new project )

To run build jar files (run at jdk17 or +) -->
	Go to current directory and run following command
	java -jar target/weather-monitoringV2-1.0.0-SNAPSHOT.jar server meta-data/app_env_config.yml

	When just double click on .jar file then open at port at 8080(default port)
	java -jar Hellow-World-Spring-0.0.1-SNAPSHOT.jar --server.port=9090
	java -jar your-app.jar --spring.config.location=file:C:/config/application.yml
	java -jar your-app.jar --spring.config.location=file:C:/config/,file:C:/custom-config/application.yml (load multiple config)

Stop the Process by Port -->
	netstat -ano | findstr :8080
	taskkill /F /PID 17031
	or
	ps -ef | grep your-app.jar
	kill <PID>

-------------------------------------------------------------------

