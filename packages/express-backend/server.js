/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable curly */
/* eslint-disable quotes */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const winston = require("winston");
const fs = require("fs");

dotenv.config();

// calling body-parser to handle the Request Object from POST requests
const bodyParser = require("body-parser");

const app = express();
// Allow requests from http://localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

const logger = winston.createLogger({
  level: "info", // Set the desired logging level
  format: winston.format.simple(), // Choose a logging format
  transports: [
    new winston.transports.Console(), // Add a transport, e.g., console
  ],
});

// Read questions and answers from the JSON file
const questionsAndAnswers = JSON.parse(
  fs.readFileSync("questionsandanswers.json", "utf8")
);

// Use routes
app.get("/api/questions", (req, res) => {
  console.log("questionsAndAnswers", questionsAndAnswers);
  res.json(questionsAndAnswers);
});

// Server our client app

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https")
      res.redirect(`https://localhost:3001${req.url}`);
    else next();
  });
  app.use(express.static("./client/build"));

  app.get("/*", (req, res) => {
    res.sendFile("./client/build/index.html", { root: __dirname });
  });
}

const port = process.env.PORT || 3001;

app.listen(port, () => logger.info(`server started on port ${port}`));
