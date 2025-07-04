import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// Import Routers
import serverRouter from './api/server.router.js';
import stationRouter from './api/station.router.js';


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/station', stationRouter);
app.use('/api/server', serverRouter);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' })
});

export default app;