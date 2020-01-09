const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.ENV || "development";

app.set("port", PORT);
app.set("env", NODE_ENV);

// Middlewares
app.use(logger("tiny"));
app.use(bodyParser.json());

app.use("/", require("./routes/stats.js"));

app.use((req, res, err) => {
  const error = new Error(`${req.method} ${req.url} NOT FOUND`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(PORT, () => {
  console.log(
    `Express server Started  on Port  ${app.get(
      "port"
    )} | ENVIRONMENT: ${app.get("env")}`
  );
});
