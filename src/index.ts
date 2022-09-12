import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './api/middlewares/logger.middleware';
import errorHandler from './api/middlewares/error-handler.middleware';
import { generateTokenSecret } from './api/utils/jwt.utils';
import routes from './api/routes';
import chalk from 'chalk';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = +process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  console.info('JWT Secret:', chalk.cyanBright(generateTokenSecret('Demo User')));
}

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(logger);
app.use('/api/', routes);
app.use(errorHandler);

app.get('/api', (req, res) => {
  res.status(202).send({
    message: 'Endpoint Running',
    env: process.env.PROJECT,
  });
});

app.listen(port, () => {
  console.log(`Kanban API listening at http://localhost:${port}`);
});
