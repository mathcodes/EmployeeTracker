USE employee_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Jon", "Christie", 1, 5),
    ("Sarah", "Larsen", 2, Null),
    ("Nancy", "Gomez", 3, 5),
    ("Mike", "Joe", 4, 1),
    ("Rob", "Bert", 5, Null),
    ("Jane", "Doe", 6, 1),
    ("Brian", "Matt", 7, 1),
    ("Mary", "Jane", 8, 1);

INSERT INTO role (title, salary, department_id)
VALUES
    ("Salesperson", 45000, 1),
    ("Lead Engineer", 80000, 2),
    ("Software Engineer", 70000, 2),
    ("Lawyer", 90000, 4);

INSERT INTO department (name)
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");