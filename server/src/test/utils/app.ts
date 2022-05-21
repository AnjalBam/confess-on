import express from 'express'
import { setupDb } from '../db/testDb';
import createServer from '../../server';


export async function init() {
    const app = createServer();
    await setupDb();
    return app;
}