import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import multer from "multer";
import request from "request";
import { createPool } from "mysql";
import { getEmployees } from "./src/employees.js";

// read env variable from .env file
dotenv.config();

// initialize app as express router
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// use morgan to log requests
app.use(morgan("combined"));

// create mysql connection pool
var pool = createPool({
	connectionLimit: process.env.DB_CONNECTION_LIMIT,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

// test endpoint
const v = "0.1.2";
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

app.post("/upload", upload.single("file"), function (req, res) {
	const username = process.env.DRIVE_USERNAME;
	const password = process.env.DRIVE_PASSWORD;
	var auth = "Basic " + Buffer.from(username + ":" + password).toString("base64");

	request.put(
		{
			url: process.env.DRIVE_WEBDAV_URL + req.file.originalname,
			headers: {
				Authorization: auth,
				"X-Requested-With": "XMLHttpRequest",
			},
			body: req.file.buffer,
		},
		function (err, response, body) {
			if (err) {
				console.error(err);
				return res.status(500).send(err);
			}
			console.log(response.statusCode, body);
			res.status(200).send(body);
		}
	);
});

// read PORT from environment variable
// dev: 3000
// prod: 3001
app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
