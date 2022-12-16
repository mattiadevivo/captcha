import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { Server } from 'http';
import { registerRoutes } from './routes/routes';
import { connectDb, createDbClient, disconnectDb } from './persistence/store';
import { exit as exitProcess } from 'process';
import { redisConfiguration, serverConfiguration } from './config';
import cors from 'cors';

dotenv.config();

let server: Server;

const initStore = () => {
    const { username, password, host, port, dbNumber } = redisConfiguration;
    createDbClient(username, password, host, port, dbNumber);
};

const initServer = async () => {
    // DB setup
    initStore();
    // Connect db
    await connectDb();
    // Express setup
    const app = express();
    // Logs incoming requests
    app.use(morgan('dev'));
    // Parse incoming request body and append data to `req.body`
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // enable cors
    app.use(cors());
    // Register application routes
    registerRoutes(app);
    // Middleware for managing not existing routes
    app.use((req: express.Request, res: express.Response) => {
        res.status(404).json({ error: `${req.url} not found` });
    });

    server = app.listen(serverConfiguration.port, () => {
        console.log(`Server stared at port ${serverConfiguration.port}`);
    });
};

initServer();

// Gracefully shutdown
const gracefulShutdown = async () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');

    // server.close() stops accepting new connections
    server.close(async () => {
        console.log('Http server closed.');
    });
    await disconnectDb();
    exitProcess(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
