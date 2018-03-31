require('./config/config');

const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { mongoose } = require('./db/mongoose');

// const userRoutes = require('./routes/user')
// const entreprisesRoutes = require('./routes/entreprises')
const dossiersRoutes = require('./routes/dossiers')

app.use(morgan("dev"));
app.use('../uploads', express.static('../uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// http://expressjs.com/fr/guide/using-middleware.html

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// app.use("/user", userRoutes);
// app.use("/entreprises", entreprisesRoutes);
app.use("/dossiers", dossiersRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;