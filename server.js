const express = require("express");
const app = express();
const postgres = require("pg");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config(".env");
app.use(bodyParser.json());

const postgresInit = new postgres.Pool({
  host: process.env.host,
  port: process.env.port,
  database: process.env.dbDatabase,
  user: process.env.dbuser,
  password: process.env.password,
});

app.get("/", (req, res) => {
  res.json("Home Page");
});

app.post("/create", async (req, res) => {
  let connection = await postgresInit.connect();
  const { name, email, age, gender } = req.body;
  let inserQuery =
    "insert into public.users(name,email,age,gender) values($1,$2,$3,$4)";

  const record = await connection.query(inserQuery, [name, email, age, gender]);
  res.json(record);
});

app.post("/updateuser/:id", async (req, res) => {
  let connection = await postgresInit.connect();
  const { name, email, age, gender } = req.body;
  let updateQuery =
    "UPDATE public.users SET name=$1, age=$2, gender=$3 WHERE id = " +
    req.params.id;

  const record = await connection.query(updateQuery, [name, age, gender]);
  res.json(record);
});

app.get("/getusers", async (req, res) => {
  let connection = await postgresInit.connect();
  let inserQuery = "select * from public.users";
  const record = await connection.query(inserQuery);
  res.json(record.rows);
});

app.get("/getusersDetailds/:id", async (req, res) => {
  let connection = await postgresInit.connect();
  let inserQuery =
    "select * from public.users  where id =" + req.params.id + " limit 1";

  const record = await connection.query(inserQuery);
  res.json(record.rows);
});

app.get("/deleteuser/:id", async (req, res) => {
  let connection = await postgresInit.connect();
  let inserQuery = "delete from public.users where id =" + req.params.id;

  const deleteRecord = await connection.query(inserQuery);
  res.json(deleteRecord);
});

app.listen(2000, () => {
  console.log("localhost:2000");
});
