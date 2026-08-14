import { config } from 'dotenv';
import express from 'express';
import connectMondoDB from './database/connect.js';
import taskRouter from './route/taskRoute.js';
import defaultPage from './middleware/defaultPage.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
config(); // Injecting the .env data into the process.env

const server = express();
const port = process.env.port || 3000

// For proper reading of the request contents in HTTP
server.use(express.json());
server.use("/", (defaultPage)); //For easier referencing
server.use("/api/v1/task", taskRouter);

// 404 — route wasn't found
server.use(notFound);

// Error Handler
server.use(errorHandler);

// If the database fails, the system should not run
async function startServer() {
    try {
        const mongo_uri = process.env.MONGO_URI;
        // Making sure the mongo_uri have a value before processing
        if (mongo_uri) await connectMondoDB(mongo_uri); 
        else {
            console.error("Mongo_URI has not been assigned");
            return;
        }
        server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        else {console.error(error);}
    }
}

startServer();
