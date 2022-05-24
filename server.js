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

