const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');

require('dotenv').config();

const mysql = require('mysql2');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the database.`)
);

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
            'Update an employee role'
        ]         
    })
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
        }
    })
}

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

function addDepart() {
    mainMenu();
}

function addRole() {
    mainMenu();
}

function addEmployee() {
    mainMenu();
}

function updateRole() {
    mainMenu();
}

mainMenu();