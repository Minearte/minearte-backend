import AbstractCache from "./AbstractCache.ts";
import { Redis } from "https://deno.land/x/redis@v0.29.2/mod.ts";


class RedisCache extends AbstractCache {
    private client: Redis;

    constructor(client: Redis) {
        super();
        this.client = client;
    }

    async get(key: string): Promise<string> {
        return await this.client.get(key).then((value) => {
            if (value === null) {
                throw new Error(`The key '${key}' does not exist in the cache.`);
            }
            return value;
        });
    }

    async set(key: string, value: string): Promise<void> {
        await this.client.set(key, value);
    }

    async delete(key: string): Promise<void> {
        await this.client.del(key);
    }

    async clear(): Promise<void> {
        await this.client.flushdb();
    }

    async has(key: string): Promise<boolean> {
        return await this.client.exists(key) === 1;
    }

    async size(): Promise<number> {
        return await this.client.dbsize();
    }

    async keys(): Promise<string[]> {
        return await this.client.keys('*');
    }

    async values(): Promise<string[]> {
        const keys = await this.keys();
        const values = await Promise.all(keys.map((key) => this.get(key)));
        return values;
    }

    async entries(): Promise<[string, string][]> {
        throw await new Error("Method not implemented.");
    }

    async forEach(_callbackfn: (value: string, key: string, map: Map<string, string>) => void, _thisArg?: string): Promise<void> {
        throw await new Error("Method not implemented.");
    }
}

export default RedisCache;