let mysql = require("mysql");
let inquirer = require("inquirer");

// const dataStore = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "yourRootPassword",
//     database: "EmployeeTrackerDB"
// });
// dataStore.connect(function (err) {
//     if (err) throw err;
// });

// const mysql = require("mysql");

// class Database {
//   constructor( config ) {
//       this.connection = mysql.createConnection( config );
//   }
//   query( sql, args ) {
//       return new Promise( ( resolve, reject ) => {
//           this.connection.query( sql, args, ( err, rows ) => {
//               if ( err ) {
//                   console.log(err.sql);
//                   console.log("");
//                   return reject( err );
//               }
//               resolve( rows );
//           } );
//       } );
//   }
// }


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourRootPassword",
    database: "EmployeeTrackerDB"
});
connection.connect(function (err) {
    if (err) throw err;
    //runSearch();
    getManagerNames();
});

/* Database Calls: Begin */

// Getting role.title + employee.manager_id Simultaneously 

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
//     connection.query("SELECT * FROM department WHERE department.name=?", ["departmentName"], function (err, res) {
//         if (err) throw err;
//         //console.log(res);
//         let departmentId = [];
//         for (let i =0; i<res.length; i++) {
//            departmentId.push(res[i].name);
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
//     connection.query("SELECT * FROM department WHERE department.name=?", ["roleName"], function (err, res) {
//         if (err) throw err;
//         //console.log(res);
//         let roleId = [];
//         for (let i = 0; i < res.length; i++) {
//             roleId.push(res[i].name);
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

/* Database Calls End */


// async function getManagerNames() {
//     let query = "SELECT * FROM employee WHERE manager_id IS NULL";
//     const rows = await connection.query(query);
//     let employeeNames = [];
//     for (const employee of rows) {
//         managerNames.push(employee.first_name + " " + employee.last_name);
//     }
//     return employeeNames;
//     };
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
//        console.log(managerNames);
//         //const rows = await db.query;
//     });
// }

// module.exports = Database;

/* Department Data Store */


// const getAllDepartments = () => {
//     return new Promise((resolve, reject) => {
//         const query = "SELECT id as 'ID', name as 'Name' FROM department";
//         dataStore.query(query, (err, results, fields) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//                 console.log(res.affectedRows + " departments found!\n");
//             }
//         });
//     });
// };

// async function getAllDepartmentNames() {
//         dataStore.query("SELECT * FROM department", function(err, res) {
//             if (err) throw err;
//             let allDepartments = res;
//             console.log(allDepartments);
//             for (let i=0; i<res.length; i++) {
//             let dNames = allDepartments[i].name;
//             console.log(dNames);
//            // console.log(allDepartments[i].id);
//         }
//     }
// ,)}
//getAllDepartmentNames();

// async function getAllDepartmentNames() {
//     try {
//         const departments = await getAllDepartments();

//         let departmentNames = [];
//         for (const department of departments) {
//             departmentNames.push(department.Name);
//         }

//         return departmentNames;
//     } catch (err) {
//         if (err) throw err;
//     }
// }

// const getDepartmentId = (departmentName) => {
//     return new Promise((resolve, reject) => {
//         const query = "SELECT id FROM department WHERE name = ?";
//         dataStore.query(query, [departmentName], (err, results,fields) => {
//            // if (err) throw err;
//            if (err) {
//            reject(err);
//            } else {
//                resolve(results[0].id);
//                console.log(res.affectedRows + " department Id found!\n");
//            }
//         });
//     });
// };

/* Role Data Store */

// module.exports = {
//     getDepartmentId,
//     getAllDepartments,
//     getAllDepartmentNames
// }



