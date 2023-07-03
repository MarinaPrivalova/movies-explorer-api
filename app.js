require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/requestsLimiter');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1/bitfilmsdb' } = process.env;

const app = express();
app.use(cors());

mongoose.connect(MONGO_URL)
  .then(() => console.log('База данных подключена'))
  .catch((err) => console.log('Ошибка подключения к БД', err));

mongoose.set({ runValidators: true });

app.use(limiter);

app.use(helmet());

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
