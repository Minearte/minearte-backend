import CachedRequests from "../cache/CachedRequests.ts";
import CacheManager from "../managers/CacheManager.ts";

await CacheManager.load();

const cacheCategories = await CachedRequests.getCategories();

console.log(cacheCategories);

Deno.exit(0);