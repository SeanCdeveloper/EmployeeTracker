const mysql = require("mysql");
const inquirer = require("inquirer");
// const { getAllDepartmentNames } = require('./department');
// const { getDepartmentID } = require('./dataStore');
// const { getAllRoles } = require('../dataStore');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourRootPassword",
    database: "EmployeeTrackerDB"
});
connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "View all Departments",
                "View all Roles",
                "View all Employees By Department",
                "View all Employees By Manager",
                "Add Employee",
                "Delete Employee",
                "Add Departments",
                "Delete Department",
                "Add Roles",
                "Update Employee Role",
                "Delete Role",
                "Update Employee Manager",
                "View Total Budget",
                "exit",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View all Employees":
                    viewEmployees();
                    break;
                case "View all Departments":
                    viewDepartments();
                    break;
                case "View all Roles":
                    viewRoles();
                    break;
                case "View all Employees By Department":
                    viewAllEmployeesByDepartment();
                    break;
                case "View all Employees By Manager":
                    viewAllEmployeesByManager();
                    break;
                case "Add Departments":
                    addDepartments();
                    break;
                case "Delete Department":
                    deleteDepartment();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Roles":
                    addRoles();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                case "Delete Role":
                    deleteRole();
                    break;
                case "Delete Employee":
                    deleteEmployee();
                    break;
                case "View Total Budget":
                    viewTotalBudget();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
        });
}

let viewTotalBudget = () => {
    connection.query("SELECT SUM(salary) FROM role", (err, res) => {
        if (err) throw err;
        let add1 = res[0];
        let {'SUM(salary)': added} = add1;
        console.log(added);
    });
    runSearch();
}

function deleteRole() {
    let query = "SELECT title FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        let dRolez = res.map(role => role.title);
        inquirer
            .prompt([
                {
                    name: "deleteRole",
                    type: "list",
                    message: "What Role do you want to delete?",
                    choices: [...dRolez]
                }
            ]).then((answer) => {
                let query2 = "SELECT * FROM role WHERE role.title=?";
                connection.query(query2, answer.deleteRole, function (err, res) {
                    if (err) throw err;
                    let roleDel = res[0].id;
                    let query3 = "DELETE FROM role WHERE role.id=?"
                    connection.query(query3, roleDel, function (err, res) {
                        if (err) throw err;
                    });
                    runSearch();
                });
            });
    });
}

function deleteDepartment() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, deparName) {
        const depName = deparName.map(name => name.name);
        inquirer
            .prompt([
                {
                    name: "deleteDName",
                    type: "list",
                    message: "What Department do you want to delete?",
                    choices: [...depName]
                }
            ]).then((answer) => {
                var query = "SELECT id FROM department WHERE department.name=?";
                connection.query(query, answer.deleteDName, function (err, res) {
                    let dId = res[0].id;
                    query2 = "DELETE FROM department WHERE department.id=?";
                    connection.query(query2, dId, function (err, res) {
                        if (err) throw err;
                    });
                    runSearch();
                })
            })
    });
}

function viewEmployees() {
    //console.log("View all Employees");
    connection.query("SELECT * FROM EmployeeTrackerDB.employee", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(
                " First Name: " +
                res[i].first_name +
                " || Last Name: " +
                res[i].last_name +
                " || Role Id: " +
                res[i].role_id +
                "||  Manager Id: " +
                res[i].manager_id
            );
        }
    });
    runSearch();
}

function viewAllEmployeesByDepartment() {
    connection.query("SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        //  employeeByDepartment= [];
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].first_name + " " + res[i].last_name + " | Department: " + res[i].name);
        }
        runSearch();
    });
}

    function viewAllEmployeesByManager() {
        connection.query("SELECT * FROM employee WHERE manager_id IS NOT NULL", function (err, emps) {
            if (err) throw err;
            connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function(err, mngrs) {
                if (err) throw err;
                let managers = mngrs.map(mngr => mngr.first_name + " " + mngr.last_name + " " + mngr.id);
                let employees = emps.map(emp => emp.first_name + " " + emp.last_name + " " + emp.manager_id);
                console.log(employees);
                console.log(managers);
            })
            runSearch();
        });
    }

    function updateEmployeeManager() {
        console.log("hello")
        connection.query("SELECT * FROM employee WHERE manager_id IS NOT NULL", function (err, emps) {
            if (err) throw err;
            connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function(err, mngrs) {
                if (err) throw err;
                let employees = emps.map(emp => emp.first_name + " " + emp.last_name);
                let managers = mngrs.map(mngr => mngr.first_name + " " + mngr.last_name);
                inquirer.prompt([
                    {
                        name: "empChange",
                        type: "list",
                        message: "Which employee will receive a manager change?",
                        choices: [...employees]
                    },
                    {
                        name: "mngrChange",
                        type: "list",
                        message: "Who is the employee's new manager?",
                        choices: [...managers]
                    }
                ]).then(function (answer) {
                    let manager = answer.mngrChange.split(" ");
                    let changedEmp = answer.empChange.split(" ");
                    let query = "SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?"
                    connection.query(query, [manager[0], manager[1]], function (err, res) {
                        if (err) throw err;
                        let newManagerId = res[0].id;
                       // console.log(newManagerId);
                        let query2 = "UPDATE employee SET manager_id=? WHERE employee.first_name=? AND employee.last_name=?";
                    connection.query(query2, [newManagerId, changedEmp[0], changedEmp[1]], function (err, res) {
                        if (err) throw err;
                    });
                    })
                    runSearch();
                })
            });
        });
    }

function viewDepartments() {
    connection.query("SELECT * FROM EmployeeTrackerDB.department", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(
                " id: " +
                res[i].id +
                " || Department: " +
                res[i].name
            );
        }
    });
    runSearch();
}

function viewRoles() {
    console.log("View all Roles");
    connection.query("SELECT * FROM EmployeeTrackerDB.role", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(
                " Id: " +
                res[i].id +
                " || Title: " +
                res[i].title +
                " || Salary: " + res[i].salary +
                "|| Department Id: " + res[i].department_id
            );

        }
    });
    runSearch();
}

function addEmployee() {
    connection.query("SELECT title FROM role", function (err, roles) {
        if (err) throw err;
        connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, managers) {
            if (err) throw err;
            const roleTitle = roles.map(role => role.title)
            const managerList = managers.map(manager => manager.first_name + " " + manager.last_name);
            inquirer
                .prompt([
                    {
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
                        name: "role_id",
                        type: "list",
                        message: "What is the employee's role?",
                        choices: [...roleTitle]
                    },
                    {
                        name: "manager_id",
                        type: "list",
                        message: "Who is the employee's manager?",
                        choices: [...managerList]
                    }
                ]).then(function (answer) {
                    console.log("Inserting a new Employee...\n");
                    let query = "SELECT * FROM role WHERE role.title=?";
                    connection.query(query, answer.role_id, function (err, idRole) {
                        if (err) throw err;
                        let roleId = idRole[0].id;
                        let query2 = "SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?"
                        connection.query(query2, answer.manager_id.split(" "), function (err, idManager) {
                            if (err) throw err;
                            let managerId = idManager[0].id;
                            connection.query(
                                "INSERT INTO employee SET ?",
                                {
                                    first_name: answer.firstName.trim(),
                                    last_name: answer.lastName.trim(),
                                    role_id: roleId,
                                    manager_id: managerId
                                },
                                function (err, res) {
                                    if (err) throw err;
                                }
                            );
                            runSearch();
                        })
                    })
                });
        });
    });
}

function addDepartments() {
    inquirer
        .prompt([
            {
                name: "addDepartment",
                type: "input",
                message: "What Department do you want to add?",
            }
        ]).then(function (answer) {
            console.log("Inserting a new Department...\n");
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.addDepartment,
                },
                function (err, res) {
                    if (err) throw err;
                }
            );
            runSearch();
        });
}

function addRoles() {
    connection.query('SELECT name FROM department', function (err, results) {
        if (err) throw err;
        const role = inquirer.prompt([
            {
                name: "addTitle",
                type: "input",
                message: "Enter the role you want to add?",
            },
            {
                name: "salary",
                type: "input",
                message: "Enter the salary for this role?",
            },
            {
                name: "addDepart",
                type: "list",
                message: "To what department do you want to add this role?",
                choices: function () {
                    let dNames = [];
                    for (let i = 0; i < results.length; i++) {
                        dNames.push(results[i].name);
                    }
                    return dNames;
                }
            }
        ]).then(function (answer) {
            console.log("Inserting a new Department...\n");
            var query = "SELECT * FROM department WHERE department.name=?";
            connection.query(query, [answer.addDepart], function (err, departId) {
                if (err) throw err;
                var idDepart = departId[0].id;
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.addTitle,
                        salary: answer.salary,
                        department_id: idDepart
                    },
                    function (err, res) {
                        if (err) throw err;
                    }
                );
                runSearch();
            });
        });
    });
}

function updateEmployeeRole() {
    connection.query('SELECT * FROM employee', function (err, eNames) {
        if (err) throw err;
        connection.query("SELECT title FROM role", function (err, roles) {
            if (err) throw err;
            const empNames = eNames.map(name => name.first_name + " " + name.last_name);
            const roleT = roles.map(title => title.title)
            inquirer
                .prompt([
                    {
                        name: "employeeSearch",
                        type: "list",
                        message: "Which employee do you want to update?",
                        choices: [...empNames]
                    },
                    {
                        name: "titleOfRole",
                        type: "list",
                        message: "What is this employee's new role?",
                        choices: [...roleT]
                    },
                ]).then(function (answer) {
                    let roleTitle = answer.titleOfRole;
                    let searchEmployee = answer.employeeSearch.split(" ");
                    let query = "SELECT id FROM role WHERE role.title=?"
                    connection.query(query, answer.titleOfRole, function (err, res) {
                        if (err) throw err;
                        let newEmpRoleId = res[0].id;
                        let query = ("UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?");
                        connection.query(query, [newEmpRoleId, searchEmployee[0], searchEmployee[1]], function (err, res) {
                            if (err) throw err;
                            //console.log(res);
                        });
                        runSearch();
                    });
                });
        })
    });
}

function deleteEmployee() {
    connection.query("SELECT * FROM employee", function (req, emp) {
        const empName = emp.map(employees => employees.first_name + " " + employees.last_name);
        inquirer
            .prompt([
                {
                    name: "deleteEmployee",
                    type: "list",
                    message: "Which employee do you want to delete?",
                    choices: [...empName]
                }
            ]).then((answer) => {
                var deleteEmpFullName = answer.deleteEmployee.split(" ");
                let query = "DELETE FROM employee WHERE first_name=? AND last_name=?";
                connection.query(query, [deleteEmpFullName[0], deleteEmpFullName[1]], function (err, res) {
                    if (err) throw err;
                });
                runSearch();
            })
    })
}



