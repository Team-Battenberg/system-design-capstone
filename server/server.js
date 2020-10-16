const express = require('express');
const path = require('path');
const partials = require('express-partials');
const bodyParser = require('body-parser');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req, res) => {
  res.send("Kevin's first docker container - wow !!!")
});
console.log("it executes");

module.exports = app;