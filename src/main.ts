import server from "./server.ts";
import logger from "./utils/logger.ts";
import CacheManager from "./managers/CacheManager.ts";
import axios from "./requests/axios.ts"

logger.clear();

await CacheManager.load();
server.start();