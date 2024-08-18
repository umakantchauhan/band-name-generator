import express from "express";

const app = express();
const port = 3000;

//custom middleware for getting method and URL
/*  Listening on port 3000
    Request Method:  GET
    Request URL:  /          */

function logger(req, res, next) {
  console.log("Request Method: ", req.method);
  console.log("Request URL: ", req.url);
  next();
}

app.use(logger);  //logger is a custom name for own middleware

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
