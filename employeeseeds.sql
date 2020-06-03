/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employee_DB;

/* Insert Rows into new table */
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
VALUES ("Video Specialist", 110000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Audio Specialist", 50000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Web Developer", 80000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("Multimedia Producer", 65000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Multimedia Producer", 120000, 3);