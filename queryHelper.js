var connection = require("./connection");

// READ
function getEverything() {
    return connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee manager ON employee.manager_id=manager.id");
}

function getEmployees() {
    return connection.query("SELECT * FROM employee");
}

function getEmployeesByManager(input) {
    return connection.query("SELECT first_name, last_name, role_id FROM employee WHERE manager_id = ?", [input.manager_id]);
}

function getIndEmployee(answer) {
    var name = (answer.choice.split(" "));
    return connection.query("SELECT * FROM employee WHERE first_name = ? AND last_name = ?", [name[0], name[1]]);
    // return connection.query("SELECT title FROM role WHERE role_id = ?", [emp.role_id]);
}

function getIndDepartment(name) {
    return connection.query("SELECT * FROM department WHERE ?", { name: name.choice });
}

function getIndRole(name) {
    return connection.query("SELECT * FROM role WHERE ?", { title: name.choice });
}

function getEmployeeAndRole(answer) {
    return connection.query("SELECT first_name, last_name, title FROM employee LEFT JOIN role ON employee.role_id = role.id WHERE first_name = ? AND last_name = ?", [answer[0].first_name, answer[0].last_name]);
}

function getRoles() {
    return connection.query("SELECT * FROM role");
}
// function getManagers() {
//     return connection.query("SELECT * FROM employee WHERE manager_id != ' '");
// }

function getManagerId(manager) {
    return connection.query("SELECT * FROM employee WHERE ?", { manager_id: manager.manager_id })
}

function getDepartment() {
    return connection.query("SELECT * FROM department");
}

function getTotalBudget() {
    return connection.query("SELECT department.id, department.name, SUM(role.salary) AS budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id")
}

// CREATE
function addDepartment(answer) {
    return connection.query("INSERT INTO department SET ?", { name: answer.name });
}

function addRole(answer, department) {
    var id = department.choice.split("-")[0];
    return connection.query("INSERT INTO role SET ?", [{
        title: answer.title,
        salary: answer.salary,
        department_id: id
    }]);
}


// pass the parameters for ALL separate inquirer responses
function addEmployee(answer, role, manager) {
    // get id out of user's inquirer response
    var roleId = role.choice.split("-")[0];
    var managerId = manager.choice.split("-")[0];
    return connection.query("INSERT INTO employee SET ?", {
        first_name: answer.first_name,
        last_name: answer.last_name,
        //the key names must match the column names in the schema
        role_id: roleId,
        manager_id: managerId
    });
}

function updateManager(emp, manager) {
    return connection.query("UPDATE employee SET ? WHERE ?", [{
            manager_id: manager[0].manager_id
        },
        {
            id: emp[0].id
        }
    ]);
}

function updateRole(indEmployee, indRole) {
    return connection.query("UPDATE employee SET ? WHERE ?", [{
            first_name: indEmployee[0]
        },
        {
            last_name: indEmployee[1]
        },
        { role_id: indRole[0] }
    ])
}

function deleteDepartment(department) {
    return connection.query("DELETE FROM department WHERE ?", { id: department[0].id });
}

function deleteRole(input) {
    return connection.query("DELETE FROM role WHERE ?", { id: input[0].id });
}

function deleteEmployee(input) {
    return connection.query("DELETE FROM employee WHERE ?", { id: input[0].id });
}

module.exports = {
    getEverything,
    getEmployees,
    getRoles,
    getDepartment,
    getTotalBudget,
    addDepartment,
    addRole,
    addEmployee,
    getIndEmployee,
    getIndDepartment,
    getIndRole,
    getManagerId,
    getEmployeesByManager,
    updateManager,
    updateRole,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    getEmployeeAndRole
}