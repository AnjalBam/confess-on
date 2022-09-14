import dotenv from 'dotenv';
import setupDatabase from './src/db';

import createServer from './src/server';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = createServer();

(async () => {
    setupDatabase();
})();

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});
