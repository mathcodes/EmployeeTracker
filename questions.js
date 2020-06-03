const inquirer = require("inquirer");

function mainMenu() {
    return inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would action would you like to take?",
        choices: ["Add",
            "View",
            "Update/Delete",
            "Exit"
        ]
    }])
}

// Add Questions
function addMenu() {
    return inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to add?",
        choices: ["Add department",
            "Add role",
            "Add employee",
            "Back to main menu"
        ]
    }])
}

function addRoleQuestions() {
    return inquirer.prompt([{
            type: "input",
            message: "Enter the title of the role:",
            name: "title"
        },
        {
            type: "input",
            message: "Enter the salary of the role:",
            name: "salary",

            validate: function(input) {
                // Declare function as asynchronous, and save the done callback
                var done = this.async();

                // Do async stuff
                setTimeout(function() {
                    if (typeof input !== 'number') {
                        // Pass the return value in the done callback
                        done('You need to provide a number');
                        return;
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                }, 500);
            },
        },
        {
            type: "input",
            message: "Enter the role ID:",
            name: "role_id"
        },
        {
            type: "input",
            message: "Enter the department ID:",
            name: "department_id"
        }
    ])
}

function addEmployeeQuestions() {
    return inquirer.prompt([{
            type: "input",
            message: "Enter the first name of the employee:",
            name: "first_name"
        },
        {
            type: "input",
            message: "Enter the last name of the employee:",
            name: "last_name"
        },
        {
            type: "input",
            message: "Enter the role ID:",
            name: "role_id"
        },
        {
            type: "input",
            message: "Enter the manager ID if applicable:",
            name: "manager_id"
        }
    ])
}

function addDepartmentQuestions() {
    return inquirer.prompt([{
        type: "input",
        message: "Enter the name of the department:",
        name: "name"
    }])
}

// View Questions
function viewMenu() {
    return inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to view?",
        choices: ["View all employee information",
            "View employees",
            "View departments",
            "View roles",
            "View an individual employee",
            "View employees by manager",
            "View total utilized budget of a department",
            "Back to main menu"
        ]
    }])
}

// Update Questions
function updateMenu() {
    return inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to update?",
        choices: ["Update employee role",
            "Update employee manager",
            "Delete department",
            "Delete role",
            "Delete employee",
            "Back to main menu"
        ]
    }])
}

function whichRole(roles, action) {
    var names = roles.map(item => item.title);
    return inquirer.prompt([{
        type: "list",
        name: "choice",
        message: `Which role would you like to ${action}?`,
        choices: names
    }])
}

function whichManager(employees, action) {
    var names = employees.map(item => { if (item.manager_id !== null) { return item.first_name + " " + item.last_name } });
    return inquirer.prompt([{
        type: "list",
        name: "choice",
        message: `Which manager would you like to ${action}?`,
        choices: names
    }])
}



function whichDepartment(departments, action) {
    var names = departments.map(item => item.name);
    return inquirer.prompt([{
        type: "list",
        name: "choice",
        message: `Which department would you like to ${action}?`,
        choices: names
    }])
}

function whichEmployee(employees, action) {
    var names = employees.map(item => item.first_name + " " + item.last_name);
    return inquirer.prompt([{
        type: "list",
        name: "choice",
        message: `Which employee would you like to ${action}?`,
        choices: names
    }])
}

module.exports = {
    mainMenu,
    addMenu,
    viewMenu,
    updateMenu,
    addRoleQuestions,
    addEmployeeQuestions,
    addDepartmentQuestions,
    whichRole,
    whichManager,
    whichDepartment,
    whichEmployee
}