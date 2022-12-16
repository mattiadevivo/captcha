import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType;

const createDbClient = (
    username: string,
    password: string,
    host: string,
    port: string,
    dbNumber: string
) => {
    redisClient = createClient({
        url: `redis://${username}:${password}@${host}:${port}/${dbNumber}`,
    });
    redisClient.on('error', (err) => console.log(`Redis error: ${err}`));
};

const connectDb = async (): Promise<void> => {
    return await redisClient.connect();
};

const disconnectDb = async (): Promise<void> => {
    return await redisClient.disconnect();
};

const get = async (key: string): Promise<string | null> => {
    return await redisClient.get(key);
};

const set = async (key: string, value: string): Promise<string | null> => {
    return await redisClient.set(key, value);
};
export { createDbClient, connectDb, disconnectDb, get, set };
