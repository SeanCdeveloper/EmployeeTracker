const inquirer = require("inquirer");
viewEmp();
function viewEmp() {
    inquirer
    .prompt({
      name: "emp",
      type: "input",
      message: "View All Employees"
    })
      .then(function(answer) {
        connection.query("SELECT * FROM job_list.employees_id;", function (err, res) {
            if (err) throw err;
            console.log(res);   
            console.log(answer.res);
        });
      //  runSearch();
      });
  };
