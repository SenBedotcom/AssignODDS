import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import studentRouter from '@router/StudentRouter';
import sortingHatRouter from '@router/SortingHatRouter';

import config from 'src/config';

const app: Express = express();
const port = config.port;

app.use(helmet());
app.use(cors({ origin: config.cors }));
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/knockknock', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Who\'s there?' });
});

app.use('/student', studentRouter);
app.use('/sorting-hat', sortingHatRouter);

app.listen((port), () => {
  console.log('⚡️ Server is running on port ' + port);
});
