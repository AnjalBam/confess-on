import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import routes from "./routes";
import setupDatabase from "./db";

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

setupDatabase();

app.use("/api/v1", routes);

const createServer = () => {
    app.listen(PORT, () => {
        console.log(`Running at http://localhost:${PORT}`);
    });
};

export default createServer;
