var mysql = require("mysql");
var inquirer = require('inquirer');

// var connection = mysql.createConnection({
//     host: "localhost",

//     // Your port; if not 3306
//     port: 3306,

//     // Your username
//     user: "root",

//     // Your password
//     password: "",
//     database: "employee_DB"
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log('connected as id' + connection.threadId + '\n');
//     //start();
//     runSearch();
// });

runSearch();

function runSearch() {
    inquirer
        .prompt({
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: [
                "Add Employee",
                "View all Employees",
                "Remove Employee",
                "Add Department",
                "Add Roles",
                "View all Roles",
                "Update Employee Role",
                "Exit"
            ]
        }).then(function(answer, action) {
            console.log("after first inquirer prompt, answer,action " + JSON.stringify(answer, action));
            switch (answer.action) {
                case "Add Employee":
                    addEmployee();
                    break;

                case "View all Employees":
                    viewAllEmployees();
                    break;

                case "Remove Employee":
                    removeEmployees();
                    break;

                case "Add Department":
                    addDept();
                    break;

                case "View all Departments":
                    viewAllDept();
                    break;

                case "Remove Department":
                    removeDept();
                    break;

                case "Add Roles":
                    addRole();
                    break;

                case "View all Roles":
                    viewAllRoles();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function addEmployee() {

    inquirer.prompt([{
            name: "first_name",
            type: "input",
            message: "What is the new first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the new last name?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the role id? (1,2,3,4)",
            choices: [1, 2, 3, 4]
        },
        {
            name: "manager_id",
            type: "rawlist",
            message: "What is the manager id number?",
            choices: [1, 0]
        }
    ]).then(function(answer) {
        console.log(answer);
        connection.query(
            "INSERT INTO employee SET ?", {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id

            },
            function(err) {
                if (err) throw err;
                console.log("Employee Added!")
                runSearch();
            }
        )

    })

}


function removeEmployees() {
    let employeesList = [];
    connection.query(
        "SELECT employees.first_name, employees.last_name FROM employee_trackerDB.employees", (err, res) => {
            for (let i = 0; i < res.length; i++) {
                employeesList.push(res[i].first_name + " " + res[i].last_name);
            }
            inquirer
                .prompt([{
                    type: "list",
                    message: "Which employees would you like to delete?",
                    name: "employees",
                    choices: employeeList

                }, ])
                .then(function(res) {
                    const query = connection.query(
                        `DELETE FROM employees WHERE concat(first_name, ' ' ,last_name) = '${res.employees}'`,
                        function(err, res) {
                            if (err) throw err;
                            console.log("Employee deleted!\n");
                            runSearch();
                        });
                });
        }
    );
};

function viewAllEmployees() {
    connection.query("SELECT employees.first_name, employees.last_name, roles.title AS \"role\", managers.first_name AS \"manager\" FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id",
        function(err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
}

function addDept() {
    inquirer
        .prompt([{
            type: "input",
            name: "deptName",
            message: "What Department would you like to add?"
        }]).then(function(res) {
            console.log(res);
            const query = connection.query("INSERT INTO department SET ?", {
                    name: res.deptName
                },
                function(err, res) {
                    connection.query("SELECT * FROM employee_trackerDB.department", function(err, res) {
                        console.table(res);
                        runSearch();
                    })
                })
        })
}

function removeDept() {
    return connection.query("DELETE FROM department WHERE name = ?");
}

function addRole() {
    let department = [];
    connection.query("SELECT * FROM employee_trackerDB.department", function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            res[i].first_name + " " + res[i].last_name
            department.push({ name: res[i].name, value: res[i].id });
        }
        inquirer
            .prompt([{
                    type: "input",
                    name: "title",
                    message: "What role would you like to add?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary for the role?"
                },
                {
                    type: "list",
                    name: "department",
                    message: "What type of department?",
                    choices: department
                }
            ]).then(function(res) {
                console.log(res);
                const query = connection.query(
                    "INSERT INTO roles SET ?", {
                        title: res.title,
                        salary: res.salary,
                        department_id: res.department
                    },
                    function(err, res) {
                        if (err) throw err;
                        runSearch();
                    }
                )
            })
    })
}

function viewAllRoles() {
    connection.query("SELECT roles.*, department.name FROM roles LEFT JOIN department ON department.id = roles.department_id",
        function(err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
}


function updateEmployeeRole() {
    console.log("updating employees");
    let newEmp = [];
    connection.query("SELECT * FROM employee_trackerDB.employees", function(err, answer) {
        //  console.log(answer);
        for (let i = 0; i < answer.length; i++) {
            let employeesString = answer[i].id + '' + answer[i].first_name +
                '' + answer[i].last_name;
            newEmp.push(employeesString);
            //  console.log(newEmp);
        }
        inquirer
            .prompt([{
                    type: "list",
                    name: "updateEmpRole",
                    message: "select employees to update role",
                    choices: newEmp
                },
                {
                    type: "list",
                    message: "select new role",
                    choices: ["manager", "employees"],
                    name: "newrole"
                }
            ])
            .then(function(answer) {
                console.log("about to update", answer);
                const idToUpdate = {};
                idToUpdate.employeesId = parseInt(answer.updateEmpRole.split(" ")[0]);
                if (answer.newrole === "manager") {
                    idToUpdate.role_id = 1;
                } else if (answer.newrole === "employees") {
                    idToUpdate.role_id = 2;
                }
                connection.query(
                    "UPDATE employees SET role_id = ? WHERE id = ?", [idToUpdate.role_id, idToUpdate.employeesId],
                    function(err, data) {
                        runSearch();
                    }
                );
            });
    })
}