import express from "express";
import bodyParser from "body-parser"; // used to send information in post requests

import morgan from "morgan"; //middleware for handlimg problems

// below 3 lines of code is uded for generatin directory path
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";  //storing band name

app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true}));  //urlencoded because we are dealing with html form, this should be on top to run without problem
                                                    // because this information will go to {req.body} down 

function bandNameGenerator(req, res, next) {  //generating own middleware
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();  //moving to next middleware !!!important!!!, if not there then it will it will stuck to this page
}

app.use(bandNameGenerator);  //for runnimg the function bandNameGenerator or to call it

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // for going first to index page
});

app.post("/submit",(req,res) => {  // on submit button the information will print in console in terminal
  console.log(req.body);
  res.send(`<h1>Your band name is: </h1><h2>☮️ ${bandName} ☮️<h2>`); // on submitting it will print the band name 
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
