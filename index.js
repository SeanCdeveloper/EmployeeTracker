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

/* Database Calls: Begin */

// Selecting name FROM department AND * FROM employee WHERE manager_id IS NULL
// SELECT * FROM employee WHERE manager_id IS NULL

// getEmpInfo2();
// async function getEmpInfo2() {
//     connection.query("SELECT title FROM role", function (err, roles) {
//         if (err) throw err;
//     connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, managers) {
//             if (err) throw err;
//            // console.log(roles, managers);
//             const roleTitle = roles.map(role => role.title)
//             console.log(roleTitle);
//             const managerList = managers.map(manager => manager.first_name + manager.last_name);
//             console.log(managerList);
//         });
//     });
// }

// getManagerNames();
// async function getManagerNames() {
//     connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, res) {
//         if (err) throw err;
//         // console.log(res);
//         let managerNames = [];
//         for (let i = 0; i < res.length; i++) {
//             // console.log(res[i].first_name + " " + res[i].last_name);
//             managerNames.push(res[i].first_name + " " + res[i].last_name);
//         }
//         //return managerNames
//         console.log(managerNames);
//         //const rows = await db.query;
//     });
// }

// // Getting Manager Names:

// getManagerNames();
// let managerNames = [];
// async function getManagerNames() {
//     connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, res) {
//         if (err) throw err;
//        // console.log(res);

//         for (let i =0; i<res.length; i++) {
//            // console.log(res[i].first_name + " " + res[i].last_name);
//             managerNames.push(res[i].first_name + "" + res[i].last_name);
//         }
//         //return managerNames
//         console.log(managerNames);
//         //const rows = await db.query;
//     });
// }

// // Getting Roles:

// getRoles();
// async function getRoles() {
//     connection.query("SELECT title FROM role", function (err, res) {
//         if (err) throw err;
//         //console.log(res);
//         let roles = [];
//         for (let i =0; i<res.length; i++) {
//            roles.push(res[i].title);
//         }
//         // return roles
//        console.log(roles);
//         //const rows = await db.query;
//     });
// }

// // Getting Department Names: 

// getDepartmentNames();
// async function getDepartmentNames() {
//     connection.query("SELECT name FROM department", function (err, res) {
//         if (err) throw err;
//         //console.log(res);
//         let dNames2 = [];
//         for (let i =0; i<res.length; i++) {
//            dNames2.push(res[i].name);
//         }
//         // return dNames2;
//        console.log(dNames2);
//         //const rows = await db.query;
//     });
// }

// Getting Department Name Based on Id:

// getDepartmentId();
// async function getDepartmentId(departmentName) {
//     connection.query("SELECT * FROM department WHERE department.name=?", ["Sales"], function (err, res) {
//         if (err) throw err;
//         //console.log(res);
//         let departmentId = [];
//         for (let i =0; i<res.length; i++) {
//            departmentId.push(res[i].id);
//         }
//         //let args = [departmentName];
//         // return 2;
//        console.log(departmentId);
//         //const rows = await db.query;
//     });
// }

// // get Role Id from the role's name: 

// getRoleId();
// async function getRoleId(roleName) {
//     connection.query("SELECT * FROM department WHERE department.name=?", ["Dev Ops"], function (err, res) {
//         if (err) throw err;
//         //console.log(res);
//         let roleId = [];
//         for (let i = 0; i < res.length; i++) {
//             roleId.push(res[i].id);
//         }
//         //let args = [departmentName];
//         // return roleId;
//         console.log(roleId);
//         //const rows = await db.query;
//     });
// }

// // Getting the employee.id of a named manager: 
// getManagerId();
// async function getManagerId() {
//     let employee = getFirstandLastName(fullName);
//     connection.query("SELECT id FROM employee WHERE employee.first_name AND employee.last_name=?", ["employee[0], employee[1]"], function (err, res) {
//         if (err) throw err;
//         //console.log(res);
//         let managerId = [];
//         for (let i = 0; i < res.length; i++) {
//             managerId.push(res[i].name);
//         }
//         //let args = [departmentName];
//         // return managerId;
//         console.log(managerId);
//         //const rows = await db.query;
//     });
// }

// // Getting the First and Last name of of Employee's name and combining them into return:
// async function getEmployeeNames() {
//     connection.query("SELECT * FROM employee", ["employee[0], employee[1]"], function (err, res) {
//        let employeeNames = [];
//        for (let i = 0; i < res.length; i++) {
//             employeeNames.push(res[i].first_name + "" + res[i].last_name);
// }
//     return employeeNames;
// }

/* skipped viewAllRoles() + viewAllDepartments() + viewAllEmployees() */

// // Viewing All employees by Department: 

// viewAllEmployeesByDepartment();
// async function viewAllEmployeesByDepartment() {
//     connection.query("SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
//         if (err) throw err;
//        // console.log(res);
//         //  employeeByDepartment= [];
//         for (let i = 0; i < res.length; i++) {
//             console.log(res[i].first_name + " " + res[i].last_name + " | Department: " + res[i].name);
//         //     empByDepartment.push();
//         }
//         //let args = [departmentName];
//         // return roleId;
//        // console.log(managerId);
//         //const rows = await db.query;
//     });
// }

// // Updating an Employee Role:  (1) Given Name of Role, what is role id? (2) Given full name of employee, what is first + last name.
/* args ["roleId, employee[0], employee[1]"] */
// updateEmployeeRole();
// async function updateEmployeeRole(employeeInfo) {
//     connection.query("UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?", [1, Arrays,Johnson], function (err, res) {
//                 if (err) throw err;
//             //    // console.log(res);
//             //     //  employeeByDepartment= [];
//             //     for (let i = 0; i < res.length; i++) {
//             //         console.log(?);
//             //     //     empByDepartment.push();
//             //     }
//             //     // return ?;
//             //    // console.log(?);
//             //     //const rows = await db.query;
//             console.log(`Updated Employee: ${employee[0]} ${employee[1]} with role ${employeeInfo.role}`);
//             });
// }

// // Adding an employee: 
// addEmployee();
// async function addEmployee(employeeInfo) {
//      // let roleId = await getRoleId(employeeInfo.role);
//     // let managerId = await getEmployeeId(employeeInfo.manager);
//     //     connection.query("INSERT into employee(first_name, last_name, role_id, manager_id) VALUES ("Darth", "Vader", 8, 5);, function (err, res) {
// // let query = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
//         connection.query("UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?", [1, Arrays,Johnson], function (err, res) {
//                 if (err) throw err;
//                console.log(res);
//                 // return ?;
//                // console.log(?);
//                 //const rows = await db.query;
//            // console.log(`Updated Employee: ${employee[0]} ${employee[1]} with role ${employeeInfo.role}`);
//             });
// }

// removeEmployee();
// async function removeEmployee(employeeInfo) {
//    // const EmployeeName = getFirstAndLastName(employeeInfo.employeeName);
//         connection.query("DELETE from employee WHERE first_name=? AND last_name=? VALUES ('Darth', 'Vader')", function (err, res) {
//                 if (err) throw err;
//                console.log(res);
//                 // return ?;
//                // console.log(?);
//                 //const rows = await db.query;
//            // console.log(`Deleted Employee: ${employee[0]} ${employee[1]} with role ${employeeInfo.role}`);
//     });
// }

// async function addDepartment(departmentInfo) {
//     // const departmentNames = departmentInfo.departmentName;


// }

/* Database Calls: End */

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
                /* (Bonus)   "View all Employees By Department",*/
                /* (Bonus)  "View all Employees By Manager",*/
                "Add Employee",
                /* (Bonus)   "Remove Employee",*/
                "Add Departments",
                /* (Bonus)  "Delete Departments",*/
                "Add Roles",
                "Update Employee Role",
                /* (Bonus)   "Remove Roles",*/
                /* (Bonus)  "Update Employee Manager",*/
                /* (Bonus)  "View Total Budget",*/
                /* (Bonus)    "View Total Department Budget",*/
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
                case "Add Departments":
                    addDepartments();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Roles":
                    addRoles();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
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
                        let managerId =  idManager[0].id;
                            connection.query(
                                "INSERT INTO employee SET ?",
                                {
                                    first_name: answer.firstName,
                                    last_name: answer.lastName,
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

function updateRole() {
    console.log("Update Employee Role");
    runSearch();
}


