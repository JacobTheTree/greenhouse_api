import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Routers
import serverRouter from './api/server.router.js';
import stationRouter from './api/station.router.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api-v0.1.0/', stationRouter);
app.use('/api-v0.1.0/server', serverRouter);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' })
});

export default app;