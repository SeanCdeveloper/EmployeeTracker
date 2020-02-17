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

function viewEmployees(answer) {
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
    // // console.log("Add Employee");
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
                type: "input",
                message: "What is the employee's role?",
            },
            {
                name: "manager_id",
                type: "input",
                message: "Who is the employee's manager?",
            }
        ]).then(function (answer) {
    createProduct();
    function createProduct() {
        console.log("Inserting a new Employee...\n");
        var query = connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " name inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                //updateProduct();
            }
        );
        // logs the actual query being run
        console.log(query.sql);
    }
    runSearch();
});
}

function addDepartments() {
    //console.log("Add Departments"); 
    inquirer
    .prompt([
    {
        name: "addDepartment",
        type: "input",
        message: "What Department do you want to add?",
    }
]).then(function (answer) {
createProduct();
function createProduct() {
console.log("Inserting a new Department...\n");
var query = connection.query(
    "INSERT INTO department SET ?",
    {
        name: answer.addDepartment,
    },
    function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " name inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        //updateProduct();
    }
);
// logs the actual query being run
console.log(query.sql);
}
    runSearch();
});
}

async function addRoles() {
    inquirer.prompt([
    {
        name: "addRole",
        type: "input",
        message: "Enter the role you want to add?",
    },
    {
        name: "salary",
        type: "input",
        message: "Enter the salary for this role?",
    },
    {
        name: "addRole",
        type: "input",
        message: "To what department do you want to add this role?",
        choices: []
    }
]).then(function (answer) {

createProduct();
function createProduct() {
console.log("Inserting a new Department...\n");
var query = connection.query(
    "INSERT INTO role SET ?",
    {
        title: answer.addRole,
        salary: answer.salary,
    },
    function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " name inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        //updateProduct();
    }
);
// logs the actual query being run
console.log(query.sql);
}
    runSearch();
});
}

function updateRole() {
    console.log("Update Employee Role");
    runSearch();
}


