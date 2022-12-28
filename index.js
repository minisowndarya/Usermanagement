
const express = require('express');
const mongoDb = require('mongoose');

const usersRoute = require("./routes/users");
const groupsRoute = require("./routes/groups");

const mongoConnnectionUrl = "mongodb+srv://minisowndarya:mini%40222@cluster0.yxlt7is.mongodb.net/usermanagement";

mongoDb.connect(mongoConnnectionUrl);
const database = mongoDb.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(express.json());

app.listen(4000, () => {
    console.log(`Server Started at ${4000}`)
})


app.use('/users', usersRoute)
app.use('/groups',groupsRoute)