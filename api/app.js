require('./config/config');

const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require('helmet');

const { mongoose } = require('./db/mongoose');
const boardsRoutes = require('./routes/boards')
const cardsRoutes = require('./routes/cards')
const commentsRoutes = require('./routes/comments')
const listsRoutes = require('./routes/Lists')
const userRoutes = require('./routes/user')

app.use(helmet());
app.use(morgan("dev"));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('../uploads', express.static('../uploads'));

app.use('/user', userRoutes)
app.use("/cards/:cardId/comments", commentsRoutes);
app.use("/lists/:listId/cards", cardsRoutes);
app.use("/boards/:boardId/lists", listsRoutes);
app.use("/boards", boardsRoutes);

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