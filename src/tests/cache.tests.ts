import CachedRequests from "../cache/CachedRequests.ts";
import CacheManager from "../managers/CacheManager.ts";
import logger from "../utils/logger.ts";

await CacheManager.load();

await CachedRequests.getCategories();

logger.info("Cache test 1 passed");

logger.info("Finished cache tests.");
Deno.exit(0);