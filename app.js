const express = require('express');
const router = require('./routes');
const cors = require('cors');
// const bodyParser = require('body-parser');

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // app.use(bodyParser.json());
  app.use(cors());
  app.use(router);

  return app;
};

module.exports = { createApp };
