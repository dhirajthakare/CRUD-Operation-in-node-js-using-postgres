# CRUD-Operation-in-node-js-using-postgres
here I have created CRUD API  using node and express and for storage I am using postgres

### Step by step process  

#### Step1 - install postgres
first you need to install postgres from  there official website 

https://www.enterprisedb.com/postgresql-tutorial-resources-training?uuid=4726a163-a071-4af4-8395-6d239c34d4a1&campaignId=Product_Trial_PostgreSQL_15

And then install it in you system 
when you install postgresql that time it ask password remaimble it is user password for system .

### step2 - create database and table 
Then open pg admin and create datbase and table 

### step3 - create node app
then you have to create node app and you need to install following package 

```
npm install express
npm install cors
npm install pg
npm install body-parser
npm install nodemon
npm install dotenv

```

###### Pg package is usefull to access postgresql in node 
Then you need to make connection with postgress 
using following code 

```
const postgresInit = new postgres.Pool({
  host: process.env.host,
  port: process.env.port,
  database: process.env.dbDatabase,
  user: process.env.dbuser,
  password: process.env.password,
});

```
then you have to make connection api api where you need to write query 

```
let connection = await postgresInit.connect();

```

#### write and execute query 
then by using connection reference you can execute query see below 

```
let connection = await postgresInit.connect();
  const { name, email, age, gender } = req.body;
  let inserQuery =
    "insert into public.users(name,email,age,gender) values($1,$2,$3,$4)";

  const record = await connection.query(inserQuery, [name, email, age, gender]);
  res.json(record);

```

That's all it Now you can start server and it work boom!

