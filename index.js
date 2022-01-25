const inquirer = require('inquirer')
const path = require('path')
const mysql = require('mysql')
const ctable = require('console.table')
const db = mysql.createConnection('mysql://root:Abc123!!@localhost:3306/employees_db')
// db.connect(err => {
//   if (err) console.log(err)
//   console.log('connected to server')
//   init();
// });

const userPrompt = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Choose from the list below:',
      choices: ['Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'View Department', 'View Roles', 'View Employees']
    }
  ])
    .then(data => {
      switch (data.choice) {
        case 'Add Department':
          addDepartment()
          break;
        case 'Add Role':
          addRole()
          break;
        case 'Add Employee':
          addEmployee()
          break;
        case 'Update Employee Role':
          updateEmployeeRole()
          break;
        case 'View Department':
          viewDepartment()
          break;
        case 'View Roles':
          viewRoles()
          break;
        case 'View Employees':
          viewEmployees()
          break;
      }
    })
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter name of new department:'
    }
  ])
    .then(newDepartment => {
      db.query('INSERT INTO departments SET ?', newDepartment, err => {
        if (err) { console.log(err) }
        console.log('New department created.')
        userPrompt()
      })
    })
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter employee\'s title:'
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter employee\'s salary:'
    },
    {
      type: 'number',
      name: 'departments_id',
      message: 'Enter department ID number:'
    }
  ])
    .then(newRole => {
      db.query('INSERT INTO roles SET ?', newRole, err => {
        if (err) { console.log(err) }
        console.log('New role created.')
        userPrompt()
      })
    })
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter in employee\'s first name:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter in employee\'s last name:'
    },
    {
      type: 'number',
      name: 'role_id',
      message: 'Enter role ID number:'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter manager ID number:'
    }
  ])
    .then(newEmployee => {
      db.query('INSERT INTO employees SET ?', newEmployee, err => {
        if (err) { console.log(err) }
        console.log('New employee createed.')
        userPrompt()
      })
    })
}

function updateEmployeeRole() {
  db.query('SELECT * from employees', (err, employee) => {
    if (err) { console.log(err) }
    console.table(employee)
    inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Input Employee ID: '
      },
      {
        type: 'number',
        name: 'role_id',
        message: 'Update employee\'s role ID number:'
      }
    ])
      .then(updateEmployeeRole => {
        db.query('UPDATE employees SET ? Where ?', [{ role_id: updateEmployeeRole.role_id }, { id: updateEmployeeRole.id }], () => {
          if (err) { console.log(err) }
          console.log('Employe role updated.')
          userPrompt()
        })
      })
  })

}

function viewDepartment() {
  db.query('SELECT * FROM departments', (err, departments) => {
    if (err) { console.log(err) }
    console.table(departments)
    userPrompt()
  })
}

function viewRoles() {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) { console.log(err) }
    console.table(roles)
    userPrompt()
  })
}

function viewEmployees() {
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) { console.log(err) }
    console.table(employees)
    userPrompt()
  })
}

userPrompt()
