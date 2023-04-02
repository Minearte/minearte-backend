import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import RedisManager from "./RedisManager.ts";
import logger from "../utils/logger.ts";
import AbstractCache from "../cache/AbstractCache.ts";
import RedisCache from "../cache/RedisCache.ts";
import InternalCache from "../cache/InternalCache.ts";
import * as storeRequest from "../requests/store.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

class loader {
    private static type:string;
    private static cacheClient:AbstractCache;

    public static async load():Promise<void> {
        this.type = Deno.env.get("CACHE") || "INTERNAL";
    
        if (this.type === "REDIS") {
            await RedisManager.connect();
            this.cacheClient = new RedisCache(RedisManager.getClient());
            this.schelude();
            return
        }

        this.cacheClient = new InternalCache();
        this.schelude();
        logger.info("Using memory cache (default).");

    }

    public static async schelude():Promise<void> {
        await setInterval(async () => {
            const categories = await storeRequest.getCategories();
            await this.cacheClient.set("categories", JSON.stringify(categories));
            logger.info("Cache refreshed!");
        }, parseInt(Deno.env.get("CACHE_REFRESH") || "60000" ));
    }

    public static getCache():AbstractCache {
        return this.cacheClient;
    }

    public static getType():string {
        return this.type;
    }
}

export default loader;