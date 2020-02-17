let mysql = require("mysql");
let inquirer = require("inquirer");

const dataStore = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourRootPassword",
    database: "EmployeeTrackerDB"
});
dataStore.connect(function (err) {
    if (err) throw err;
});

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



