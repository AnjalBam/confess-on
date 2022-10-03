import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes';

const createServer = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('combined'));
    app.use(cors());
    app.use('/api/v1', routes);
    return app;
};

export default createServer;
