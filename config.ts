const redisConfiguration = {
    port: process.env.REDIS_PORT || '6379',
    username: process.env.REDIS_USER || '',
    password: process.env.REDIS_PASSWORD || '',
    dbNumber: process.env.REDIS_DB || '0',
    host: process.env.REDIS_HOST || 'localhost',
};

const serverConfiguration = {
    port: process.env.SERVER_PORT || '3000',
};

export { redisConfiguration, serverConfiguration };
