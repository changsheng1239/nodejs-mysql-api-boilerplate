const v = "0.1.2";
require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const morgan = require("morgan");
const { getEmployees } = require("./src/employees");

// initialize app as express router
const app = express();
// use morgan to log requests
app.use(morgan("combined"));

// create mysql connection pool
var pool = mysql.createPool({
	connectionLimit: process.env.CONNECTION_LIMIT,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

// test endpoint
app.get("/version", (req, res) => {
	res.json({
		version: v,
	});
});

// retrieve employees from HR_EMP by COMPANYID
// http://localhost:3000/employee/6667344978699
// GET /companies/:companyID/employees
app.get("/companies/:companyID/employees", (req, res) => {
	getEmployees(pool, req, res);
});

// read PORT from environment variable
// dev: 3000
// prod: 3001
app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
