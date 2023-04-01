import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { Redis, connect } from "https://deno.land/x/redis@v0.29.2/mod.ts";
import logger from "../utils/logger.ts";

export default class RedisManager {
    private static redisClient:Redis;

    public static async connect():Promise<void> {
        this.redisClient = await connect({
            hostname: Deno.env.get("REDIS_HOST") || "",
            maxRetryCount: 2,
            port: parseInt(Deno.env.get("REDIS_PORT") || "6379"),
            db: parseInt(Deno.env.get("REDIS_DB") || "0"),
            password: Deno.env.get("REDIS_PASSWORD") || undefined
        }).catch((err) => {
            logger.error(err);
            Deno.exit(5)
        }).finally(() => {
            logger.info("Redis connected!");
        }) as Redis;
    }

    public static getClient():Redis {
        return this.redisClient;
    }
}