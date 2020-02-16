var mysql = require("mysql");
var inquirer = require("inquirer");

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

//runSearch();

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "View all Departments",
                /* (Bonus)   "View all Employees By Department",*/
                /* (Bonus)  "View all Employees By Manager",*/
                "View all Roles",
                "Add Employee",
                "Add Departments",
                /* (Bonus)  "Delete Departments",*/
                /* (Bonus)   "Delete Employee",*/
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

function viewEmployees(answer) {
    console.log("View all Employees");

    connection.query("SELECT * FROM EmployeeTrackerDB.employee", function (err, res) {
        if (err) throw err;
        console.log(res);
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
    console.log("View all Departments");
    runSearch();
}

function viewRoles() {
    console.log("View all Roles");
    runSearch();
}

function addDepartments() {
    console.log("Add Departments");
    runSearch();
}

function addEmployee() {
    console.log("Add Employee");
    runSearch();
}

function addRoles() {
    console.log("Add Role");
    runSearch();
}

function updateRole() {
    console.log("Update Employee Role");
    runSearch();
}


