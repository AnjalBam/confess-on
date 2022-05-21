import mongoose from 'mongoose'
import {MongoMemoryServer} from 'mongodb-memory-server'

let mongod: MongoMemoryServer;

export const setupDb = async () => {
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();

    await mongoose.connect(mongoUri);
}

export const dropDatabase = async () => {
    if (mongod) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop();
    }
}

export const dropCollections = async () =>  {
    if (mongod) {
        const collections = await mongoose.connection.db.collections();
            for (const collection of collections) {
                await collection.drop();
            }
        
    }
}