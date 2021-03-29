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
          updateEmployee();
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

function addEmployee () {
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
            "Membership Specialist"
            
          ],
      },
      {
        type: "list",
        name: "employeeManager",
        message: "Who is the employee's manager?",
        choices: [
            "Bob Smith",
            "Greg Johnson",
            "Marge Simpson",
            "Diana Prince"            
          ],
      },
      {
        type: "list",
        name: "whatToDo",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Exit",
        ],
      },


    ])
    .then(function (response) {
      console.log(response);
      const query =
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
        

      const addedEmp = connection.query(
        query,
        [response.addFirstName, response.addLastName, response.employeeRole, response.employeeManager],
        function (err, data) {
            if (err) throw err;
          console.log("Added Employee", response.addFirstName, response.addLastName);
          console.log(addedEmp.sql);
          console.table("Successfully added employee!")
          
          init();
        }
      );
    });
}


const updateEmployeeRole = () => {
    console.log('Updating employee role...\n');
    const query = connection.query(
      'UPDATE ?? SET ? WHERE ?',
      [
        {
          fisrt_name: response.first_name,
        },
        {
            last_name: response.last_name,
          },
        {
          title: response.title,
        },
      ],
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} employee updated!\n`);
                
      }
    );
}
  