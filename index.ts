import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { Server } from 'http';
import { registerRoutes } from './routes/routes';
import { Store } from './persistence/store';

const env = dotenv.config();
if (env.error != null) {
    console.error('Error while loading env variables from file');
    process.exit(1);
}
let server: Server;

declare module 'dotenv' {
    interface DotenvParseOutput {
        SERVER_PORT?: string;
        REDIS_HOST?: string;
        REDIS_PORT?: string;
        REDIS_USER?: string;
        REDIS_PASSWORD?: string;
        REDIS_DB?: string;
    }
}

const initStore = (
    host = 'localhost',
    port = '6379',
    username = 'user',
    password = 'password',
    dbNumber = '1'
) => {
    return new Store(username, password, host, port.toString(), dbNumber);
};

const initServer = async () => {
    // DB setup
    const store = initStore(
        env.parsed?.REDIS_HOST,
        env.parsed?.REDIS_PORT,
        env.parsed?.REDIS_USER,
        env.parsed?.REDIS_PASSWORD,
        env.parsed?.REDIS_DB
    );
    // Express setup
    const app = express();
    // Logs incoming requests
    app.use(morgan('dev'));
    // Parse incoming request body and append data to `req.body`
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // Register application routes
    registerRoutes(app, store);
    // Middleware for managing not existing routes
    app.use((req: express.Request, res: express.Response) => {
        res.status(404).json({ error: `${req.url} not found` });
    });

    const serverPort = env.parsed?.SERVER_PORT ?? '3000';
    server = app.listen(serverPort, () => {
        console.log(`Server stared at port ${serverPort}`);
    });
};

initServer();

// Gracefully shutdown
const gracefulShutdown = () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    // server.close() stops accepting new connections
    server.close(() => {
        console.log('Http server closed.');
    });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
