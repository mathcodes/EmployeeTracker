const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// create the connection information for the sql database
let connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 8000
    port: 8000,

    // Your username
    user: "root",

    // Your password
    password: "tY4ENvt@A",
    database: "employee_DB",
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    startMenu();
});

// function which prompts the user for what action they should take
function startMenu() {
    inquirer
        .prompt({
            name: "searchMenu",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "View all Employees by Department",
                "View all Employees by Role",
                "Add an Employee",
                "Add a Department",
                "Add a Role",
                "Remove an Employee",
                "Remove a Role",
                "Remove a Department",
                "Update Employee Role",
                "Exit",
            ],
        })
        .then(function(answer) {
            // based on their answer, call the appropriate function

            switch (answer.searchMenu) {
                case "View all Employees":
                    viewEmployee();
                    break;
                case "View all Employees by Department":
                    viewDepartment();
                    break;
                case "View all Employees by Role":
                    viewRole();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Remove an Employee":
                    removeEmployee();
                    break;
                case "Remove a Role":
                    removeRole();
                    break;
                case "Remove a Department":
                    removeDepartment();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Exit":
                    console.log("Thank you for using my Employee Tracker - Jon Christie");
                    connection.end();
                    break;
            }
        });
}

function viewEmployee() {
    let query = `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, 
    role.title AS title, department.name AS department, role.salary AS salary, CONCAT(manager.first_name , " ", manager.last_name) 
    AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department 
    ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`;

    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
    });
}

function viewDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What department do you want to search by?",
        })
        .then(function(answer) {
            let query = `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, 
    role.title AS title FROM employee JOIN role 
    ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?`;

            connection.query(query, { name: answer.department }, function(err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.table(
                        res[i].id +
                        " " +
                        res[i].first_name +
                        " " +
                        res[i].last_name +
                        " " +
                        res[i].title
                    );
                }
                startMenu();
            });
        });
}

function viewRole() {
    inquirer
        .prompt({
            name: "role",
            type: "input",
            message: "What role do you want to search by?",
        })
        .then(function(answer) {
            var query = `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, 
        role.title AS title, role.salary AS salary FROM employee JOIN role 
        ON employee.role_id = role.id WHERE ?`;

            connection.query(query, { title: answer.role }, function(err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.table([
                        res[i].id +
                        " " +
                        res[i].first_name +
                        " " +
                        res[i].last_name +
                        " " +
                        res[i].title +
                        " " +
                        res[i].salary,
                    ]);
                }
                startMenu();
            });
        });
}

function addEmployee() {
    connection.query("SELECT * FROM role", function(err, resRole) {
        // select all row role table .... you create the choices {name: , value:}
        // select all employee ... build the choices based on the name and value will employee-id
        connection.query(
            `SELECT employee.id, first_name, last_name FROM employee`,

            function(err, resEmp) {
                if (err) throw err;

                inquirer
                    .prompt([{
                            name: "firstName",
                            type: "input",
                            message: "What is the employee's first name?",
                        },
                        {
                            name: "lastName",
                            type: "input",
                            message: "What is the employee's last name?",
                        },
                        {
                            name: "role",
                            type: "list",
                            message: "What is the employee's role?",
                            choices: function() {
                                roleArray = [];
                                for (var i = 0; i < resRole.length; i++) {
                                    roleArray.push({
                                        name: resRole[i].title,
                                        value: resRole[i].id,
                                    });
                                }

                                return roleArray;
                            },
                        },
                        {
                            name: "manager",
                            type: "list",
                            message: "Who is the employee's manager?",
                            choices: function() {
                                managerArray = [];
                                managerArray.push({ name: "None", value: null }); /// employeeres
                                for (var i = 0; i < resEmp.length; i++) {
                                    managerArray.push({
                                        name: resEmp[i].first_name + " " + resEmp[i].last_name,
                                        value: resEmp[i].id,
                                    });
                                }

                                return managerArray;
                            },
                        },
                    ])

                .then(function(answer) {
                    if (answer.manager === "None") {
                        answer.manager = null;
                    }
                    connection.query(
                        `INSERT INTO employee SET ?`, {
                            first_name: answer.firstName,
                            last_name: answer.lastName,
                            role_id: answer.role,
                            manager_id: answer.manager,
                        },
                        function(err) {
                            if (err) throw err;
                            startMenu();
                        }
                    );
                });
            }
        );
    });
}

function addDepartment() {
    inquirer
        .prompt({
            name: "departmentName",
            type: "input",
            message: "What is the name of the new department?",
        })

    .then(function(answer) {
        connection.query(
            "INSERT INTO department SET ?", {
                name: answer.departmentName,
            },
            function(err) {
                if (err) throw err;
                startMenu();
            }
        );
    });
}

function addRole() {
    connection.query(`SELECT id, department.name FROM department`, function(
        err,
        res
    ) {
        if (err) throw err;

        inquirer
            .prompt([{
                    name: "name",
                    type: "input",
                    message: "What is the name of the role?",
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the role's salary?",
                },
                {
                    name: "department",
                    type: "list",
                    message: "Which department to add the role?",
                    choices: function() {
                        departmentArray = [];
                        for (var i = 0; i < res.length; i++) {
                            departmentArray.push({ name: res[i].name, value: res[i].id });
                        }

                        return departmentArray;
                    },
                },
            ])
            .then(function(answer) {
                connection.query(
                    `INSERT INTO role SET ?`, {
                        title: answer.name,
                        salary: answer.salary,
                        department_id: answer.department,
                    },
                    function(err) {
                        if (err) throw err;
                        startMenu();
                    }
                );
            });
    });
}

function removeEmployee() {
    connection.query("SELECT id, first_name, last_name FROM employee", function(
        err,
        res
    ) {
        if (err) throw err;

        inquirer
            .prompt({
                name: "remove",
                type: "list",
                message: "Which employee would you like to remove?",
                choices: function() {
                    var employeeArray = [];
                    for (var i = 0; i < res.length; i++) {
                        employeeArray.push({
                            name: res[i].first_name + " " + res[i].last_name,
                            value: res[i].id,
                        });
                    }
                    return employeeArray;
                },
            })

        .then(function(answer) {
            connection.query(
                "DELETE FROM employee WHERE ?", {
                    id: answer.remove,
                },

                function(err) {
                    if (err) throw err;
                    startMenu();
                }
            );
        });
    });
}

function removeRole() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "removeRole",
                type: "list",
                message: "Which role would you like to remove?",
                choices: function() {
                    var roleArray = [];
                    for (var i = 0; i < res.length; i++) {
                        roleArray.push({ name: res[i].title, value: res[i].id });
                    }
                    return roleArray;
                },
            })

        .then(function(answer) {
            connection.query(
                "DELETE FROM role WHERE ?", {
                    id: answer.removeRole,
                },
                function(err) {
                    if (err) throw err;
                    startMenu();
                }
            );
        });
    });
}

function removeDepartment() {
    connection.query("SELECT name FROM department", function(err, res) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "removeDepartment",
                type: "list",
                message: "Which department would you like to remove?",
                choices: function() {
                    var departmentArray = [];
                    for (var i = 0; i < res.length; i++) {
                        departmentArray.push(res[i].name);
                    }
                    return departmentArray;
                },
            })

        .then(function(answer) {
            connection.query(
                "DELETE FROM department WHERE ?", {
                    name: answer.removeDepartment,
                },
                function(err) {
                    if (err) throw err;
                    startMenu();
                }
            );
        });
    });
}

function updateRole() {
    connection.query("SELECT id, first_name, last_name FROM employee", function(
        err,
        resEmp
    ) {
        connection.query(`SELECT id, title FROM role `, function(err, resRole) {
            if (err) throw err;

            inquirer
                .prompt([{
                        name: "employee",
                        type: "list",
                        message: "Which employee would you like to update?",
                        choices: function() {
                            var employeeArray = [];
                            for (var i = 0; i < resEmp.length; i++) {
                                employeeArray.push({
                                    name: resEmp[i].first_name + " " + resEmp[i].last_name,
                                    value: resEmp[i].id,
                                });
                            }
                            return employeeArray;
                        },
                    },
                    {
                        name: "role",
                        type: "list",
                        message: "What is the employee's new role?",
                        choices: function() {
                            roleArray = [];
                            for (var i = 0; i < resRole.length; i++) {
                                roleArray.push({
                                    name: resRole[i].title,
                                    value: resRole[i].id,
                                }); // roleres
                            }

                            return roleArray;
                        },
                    },
                ])
                .then(function(answer) {
                    connection.query(
                        `UPDATE employee SET role_id = ? WHERE id = ?`, [answer.role, answer.employee],
                        function(err, res) {
                            if (err) throw err;

                            startMenu();
                        }
                    );
                });
        });
    });
}