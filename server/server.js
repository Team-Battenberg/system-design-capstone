import express from 'express';
import partials from 'express-partials';
import { json, urlencoded } from 'body-parser';

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(partials());
app.use(json());
app.use(urlencoded({ extended: true }));


app.get("/",(req, res) => {
  res.send("Kevin's first docker container - wow !!!")
});
console.log("it executes");

export default app;