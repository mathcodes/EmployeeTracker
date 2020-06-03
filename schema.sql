DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL
);
-- list of roles when adding 
-- list of managers (employees) add id but use split
if not primary id, give user choices using same technique

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(12,2),
    department_id INT
);

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jon", "Christie", 2, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Free", 3, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Sammy", "Lahagua", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Quentin", "Doguermo", 4, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Michelle", "Diaz", 5);

INSERT INTO department (name)
VALUES ("UI/UX");

INSERT INTO department (name)
VALUES ("Shipping");

INSERT INTO department (name)
VALUES ("HR");

INSERT INTO department (name)
VALUES ("Management");

INSERT INTO department (name)
VALUES ("Design");

INSERT INTO role (title, salary, department_id)
VALUES ("Video Specialist", 110000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Audio Specialist", 50000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Web Developer", 80000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Multimedia Producer", 65000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("3D Modeling Designer", 120000, 5);

SELECT salary, department_id, title, SUM(salary)
FROM role, employee, department           
GROUP BY department_id;