import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from 'cors';

import routes from "./routes";
import setupDatabase from "./db";



const createServer = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan("combined"));
    app.use(cors())    
    app.use("/api/v1", routes);
    return app;
};

export default createServer;
