const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  // Your port, if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Be sure to update with your own MySQL password!
  password: "",
  database: "employee_trackerDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);

  init();
});

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "whatToDo",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "View All",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then(function (response) {
      switch (response.whatToDo) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All":
          viewAll();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        default:
          connection.end();
      }
    });
}

function viewEmployees() {
  connection.query("SELECT * FROM employees", function (err, data) {
    console.table(data);
    init();
  });
}
function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, data) {
    console.table(data);
    init();
  });
}
function viewRoles() {
  connection.query("SELECT * FROM roles", function (err, data) {
    console.table(data);
    init();
  });
}
function viewAll() {
  connection.query(
    "SELECT employees.id, first_name, last_name, title AS 'role_id', department_name AS 'department', department_manager AS 'manager', manager_id, salary FROM employees JOIN roles ON employees.role_id = roles.id JOIN department ON roles.department_id= department.id",
    function (err, data) {
      console.table(data);
      init();
    }
  );
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addFirstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "addLastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "employeeRole",
        message: "What is the employee's role?",
        choices: [
          "Development Manager",
          "Events Manager",
          "Accountant",
          "Database Administrator",
          "Development Coordinator",
          "Events Coordinator",
          "Membership Specialist",
        ],
      },
      {
        type: "list",
        name: "employeeManager",
        message: "Who is the employee's manager?",
        choices: ["Bob Smith", "Greg Johnson", "Marge Simpson", "Diana Prince"],
      },
    ])
    .then(function (response) {
      console.log(response);

      if (
        response.employeeRole === "Development Manager" &&
        response.employeeManager === "Bob Smith"
      ) {
        role_id = 1;
        manager_id = 1;
      } else if (
        response.employeeRole === "Events Manager" &&
        response.employeeManager === "Greg Johnson"
      ) {
        role_id = 2;
        manager_id = 2;
      } else if (
        response.employeeRole === "Accountant" &&
        response.employeeManager === "Marge Simpson"
      ) {
        role_id = 3;
        manager_id = 3;
      } else if (
        response.employeeRole === "Database Administrator" &&
        response.employeeManager === "Diana Prince"
      ) {
        role_id = 4;
        manager_id = 4;
      } else if (
        response.employeeRole === "Development Coordinator" &&
        response.employeeManager === "Bob Smith"
      ) {
        role_id = 5;
        manager_id = null;
      } else if (
        response.employeeRole === "Events Coordinator" &&
        response.employeeManager === "Greg Johnson"
      ) {
        role_id = 6;
        manager_id = null;
      } else if (
        response.employeeRole === "Membership Specialist" &&
        response.employeeManager === "Diana Prince"
      ) {
        role_id = 7;
        manager_id = null;
      }

      let query =
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";

      const addedEmp = connection.query(
        query,
        [response.addFirstName, response.addLastName, role_id, manager_id],
        function (err, data) {
          console.log(
            "Added Employee",
            response.addFirstName,
            response.addLastName
          );

          console.log(addedEmp.sql);

          console.log("Successfully added employee!");

          init();
        }
      );
    });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department would you like to add?",
      },
      {
        type: "list",
        name: "depManager",
        message: "Who is the department manager?",
        choices: ["Bob Smith", "Greg Johnson", "Marge Simpson", "Diana Prince"],
      },
    ])
    .then(function (response) {
      console.log(response);
      let query =
        "INSERT INTO department (department_name, department_manager) VALUES (?, ?);";

      const addedDep = connection.query(
        query,
        [response.department, response.depManager],
        function (err, data) {
          console.log(
            "Added department",
            response.department,
            " and manager",
            response.depManager
          );
          console.log(addedDep.sql);
          init();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What role would you like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for the role you just added?",
      },
    ])
    .then(function (response) {
      console.log(response);
      let query = "INSERT INTO roles (title, salary) VALUES (?, ?);";
      const addedRole = connection.query(
        query,
        [response.role, response.salary],
        function (err, data) {
          console.log("Added role", response.role, " and salary", response.salary);
          console.log(addedRole.sql);
          init();
        }
      );
    });
}
function updateEmployeeRole() {
  connection.query("SELECT * FROM employees", function (err, employee) {
    // console.table(employee);
    if (err) throw err;

    connection.query("SELECT * FROM roles", function (err, role) {
      //   console.table(role);
      if (err) throw err;

      connection.query("SELECT * FROM department", function (err, department) {
        //   console.table(role);
        if (err) throw err;

        inquirer
          .prompt([
            {
              type: "list",
              name: "employeeName",
              message: "What employee would you like to update?",
              choices: employee.map((employees) => ({
                name: employees.first_name + " " + employees.last_name,
                value: employees.id,
              })),
            },
            {
              type: "list",
              name: "role",
              message: "What is the employee's updated role?",
              choices: role.map((roles) => ({
                name: roles.title,
                value: roles.id,
              })),
            },
          ])
          .then(function (response) {
            console.log(response);

            let query =
              "UPDATE employees SET role_id=roles.id FROM roles WHERE roles.id= roles.title FROM department WHERE department.id=roles.department_id;";
            const updatedEmp = connection.query(
              query,
              [response.role],
              function (err, data) {
                console.log("Updated employee role to ", response.role);
                console.log(updatedEmp.sql);

                init();
              }
            );
          });
      });
    });
  });
}
