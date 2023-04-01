import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import RedisManager from "./RedisManager.ts";
import logger from "../utils/logger.ts";
import AbstractCache from "../cache/AbstractCache.ts";
import RedisCache from "../cache/RedisCache.ts";
import InternalCache from "../cache/InternalCache.ts";

class loader {
    private static type:string;
    private static cacheClient:AbstractCache;

    public static async load():Promise<void> {
        this.type = Deno.env.get("CACHE") || "INTERNAL";
    
        if (this.type === "REDIS") {
            await RedisManager.connect();
            this.cacheClient = new RedisCache(RedisManager.getClient());
            return
        }

        this.cacheClient = new InternalCache();
         
        new Promise<void>((resolve) => {
            resolve();
        }).then(() => {
            logger.info("Using memory cache (default).");
        });
    }

    public static getCache():AbstractCache {
        return this.cacheClient;
    }

    public static getType():string {
        return this.type;
    }
}

export default loader;