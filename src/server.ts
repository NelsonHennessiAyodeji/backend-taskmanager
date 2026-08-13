import { config } from 'dotenv';
import express from 'express';
import connectMondoDB from './database/connect';
config(); // Injecting the .env data into the process.env

const server = express();
const port = process.env.port || 3000

// For proper reading of the request contents in HTTP
server.use(express.json());

// If the database fails, the system should not run
async function startServer() {
    try {
        const mongo_uri = process.env.MONGO_URI;
        if (mongo_uri) await connectMondoDB(mongo_uri); // Making sure the mongo_uri have a value before processing
        else {
            console.error("Mongo_URI has not been assigned");
            return;
        }
        server.listen(port, () => {
            console.log(`Server listening on port http://localhost:${port}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        else {console.error(error);}
    }
}

startServer();
