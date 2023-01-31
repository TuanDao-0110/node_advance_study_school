-- 1. create database 
-- drop database if exits employeeDb;
-- create database employeeDb;
-- use employeeDb;

-- 2. create table vs set up data
create table employeeDb.employee(
    id int not null primary key,
    firstname varchar(20) not null,
    lastname varchar(30) not null,
    department varchar(15),
    salary decimal(6,2) 
);

INSERT INTO employee (id,firstname, lastname, department,salary) VALUES 
(2,'Jane','Doe', 'IT',4000),
(3,'tuan','dao', 'IT',5000);

-- or we can do like to access vs create database from every where, no need to access database 1st.
-- INSERT INTO employeeDb.employee (id,firstname, lastname, department,salary) VALUES 
-- (2,'Jane','Doe', 'IT',4000),
-- (3,'tuan','dao', 'IT',5000);

select * from employee;

-- 3. get into server in terminal : 

-- mysql -u admin -p
-- password : Milan123@

-- 4. drop user so this user can not access this sever  

drop user if exists 'zeke'@'localhost';

create user 'tuan'@'localhost' identified by '1234';
-- access only to employee table
-- grant  on employeeDb for this tuan server only so tuan can not access to other database. 
-- but at the moment we only use admin, so this just example.
-- so only employeeDb allow in tuan sever
grant all privileges on employeeDb.* to 'tuan'@'localhost';

-- show the port: 

select @@PORT;

--check host name:
MariaDB [(none)]> show variables where variable_name like 'hostname';
-- or 
SELECT @@hostname;
--or access table: 

use table_name;
-- show table column: 

show tables;

-- show all data on this column; 

select * from column_name;



