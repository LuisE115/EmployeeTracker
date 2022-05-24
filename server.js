const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');

require('dotenv').config();

const mysql = require('mysql2');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
// Creates a connection with the database using dotenv to hide credentials
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the database.`)
);

// Function to prompt the main menu options
function mainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'EXIT APP'
        ]         
    })
    // filter the answer with all the choices and call specific functions for each option
    .then(ans => {
        if (ans.action === 'View all departments') {
            viewDepart();
        } else if (ans.action === 'View all roles') {
            viewRoles();
        } else if (ans.action === 'View all employees') {
            viewEmployees();
        } else if (ans.action === 'Add a department') {
            addDepart();
        } else if (ans.action === 'Add a role') {
            addRole();
        } else if (ans.action === 'Add an employee') {
            addEmployee();
        } else if (ans.action === 'Update an employee role') {
            updateRole();
        } else if (ans.action === 'EXIT APP') {
            console.log('Thanks for using EmployeeTracker!')
            return;
        }
    })
}
// displays department table
function viewDepart() {
    console.log('Showing department table.');
    const sql = `SELECT * FROM department`;

    db.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        }
        console.table(data);
        mainMenu();
    })
}
// displays roles table
function viewRoles() {
    console.log('Showing roles table');
    const sql = `
        SELECT role.id, role.title AS role, role.salary, department.name AS department
        FROM role JOIN department ON role.department_id = department.id
    `;

    db.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        }
        console.table(data);
        mainMenu();
    })
}
// displays employees table
function viewEmployees() {
    console.log('Showing employees table.');
    const sql = `
        SELECT employee.id, employee.first_name, employee.last_name,
        role.title AS role, department.name AS department, role.salary, employee.manager
        FROM employee JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
    `;

    db.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        }
        console.table(data);
        mainMenu();
    })
}
// prompts user to create a new query with user's input to create a new department 
function addDepart() {
    inquirer.prompt({
        type: 'input',
        name: 'addDepartment',
        message: 'Enter the department you want to add: '
    })
    .then(ans => {
        const sql = `
            INSERT INTO department (name)
            VALUES ('${ans.addDepartment}')
        `;

        db.query(sql, function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(`${ans.addDepartment} added to the department list.`);
            mainMenu();
        })
    })

}
// prompts user to create a new query with user's input to create a new role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter the role you want to add: '
        },
        {
            type: 'number',
            name: 'roleSalary',
            message: 'Enter the salary for this role: $'
        },
        {
            type: 'number',
            name: 'roleDepartment',
            message: 'Enter the department ID(INTEGER) for this role: '
        }
    ])
    .then(ans => {
        const sql = `
            INSERT INTO role (title, salary, department_id)
            VALUES ('${ans.roleName}', ${ans.roleSalary}, ${ans.roleDepartment})
        `;

        db.query(sql, function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(`${ans.roleName} added to the role list.`);
            mainMenu();
        })
    })
}
// prompts user to create a new query with user's input to create a new employee field
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the First name of the new employee: '
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the Last name of the new employee: '
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'Enter the role id(INTEGER) of the new employee: '
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Enter the name of the manager for this employee(if employee doesnt have a manager leave it blank): '
        }
    ])
    .then(ans => {
        const sql = `
            INSERT INTO employee (first_name, last_name, role_id, manager)
            VALUES ('${ans.first_name}', '${ans.last_name}', ${ans.role_id}, '${ans.manager}')
        `;

        db.query(sql, function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(`${ans.first_name} ${ans.last_name} added to the employee list.`);
            mainMenu();
        })
    })
}
// prompts user to create a new query with user's input to update the role of an existing employee
function updateRole() {
    inquirer.prompt([
        {
            type: 'number',
            name: 'employeeId',
            message: 'Enter the employee id that you want to change the role: '
        },
        {
            type: 'number',
            name: 'newRole',
            message: 'Enter the new role id that you want to update: '
        }
    ])
    .then(ans => {
        const sql = `
            UPDATE employee SET role_id = ${ans.newRole} WHERE id = ${ans.employeeId}
        `;

        db.query(sql, function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(`The role for employee's id: ${ans.employeeId} has been updated.`);
            mainMenu();
        })
    })
}
// function to init the program
mainMenu();