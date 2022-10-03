/* eslint-disable no-console */
import mongoose from 'mongoose';

const setupDatabase = () => {
    console.log('Connecting to database...');
    connectToDB();
};

let dbUrl: string;
if (process.env.MONGO_DB_URL) {
    dbUrl = process.env.MONGO_DB_URL;
} else {
    dbUrl = 'mongodb://localhost/test';
}

const connectToDB = () => {
    mongoose
        .connect(dbUrl)
        .then(() => console.log('Connected to database'))
        .catch(err => {
            console.log('Error connecting to database');
            console.log(err);
        });
};

export default setupDatabase;
