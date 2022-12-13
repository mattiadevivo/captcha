import { createClient, RedisClientType } from 'redis';
class Store {
    client: RedisClientType;

    constructor(
        username: string,
        password: string,
        host: string,
        port: string,
        dbNumber: string
    ) {
        this.client = createClient({
            url: `redis://${username}:${password}@${host}:${port}/${dbNumber}`,
        });
        this.client.on('error', (err) => console.log(err));
    }

    public async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    public async set(key: string, value: string): Promise<string | null> {
        return await this.client.set(key, value);
    }
}

export { Store };
