DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    department_manager VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL, 
    last_name varchar(30) NULL, 
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);


INSERT INTO department (department_name, department_manager)
VALUES ("Fundraising", "Bob Smith");
INSERT INTO department (department_name, department_manager)
VALUES ("Events", "Greg Johnson");
INSERT INTO department (department_name, department_manager)
VALUES ("Finance", "Marge Simpson");
INSERT INTO department (department_name, department_manager)
VALUES ("Membership", "Diana Prince");


INSERT INTO roles (title, salary, department_id)
VALUES ("Development Manager", 100000,  1), ("Events Manager", 95000,  2), ("Accountant", 85000,  3), ("Database Administrator", 85000,  4),
("Development Coordinator", 45000,  1),("Events Coordinator", 48000,  2), ("Membership Specialist", 46000,  4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Smith",  1, 1), ("Greg", "Johnson",  2, 2), ("Marge", "Simpson",  3, 3),
("Diana", "Prince",  4, 4), ("Peter", "Parker",  5, null),
("Wade", "Wilson",  6, null), ("Marie", "D'Ancanto",  6, null), ("Natasha", "Romanoff",  7, null),
("Steve", "Rogers",  7, null);


SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employees;


SELECT employees.id, first_name, last_name, title AS "role_id", department_name AS "department", department_manager AS "manager", manager_id, salary
FROM employees JOIN roles ON employees.role_id = roles.id
JOIN department ON roles.department_id= department.id;











