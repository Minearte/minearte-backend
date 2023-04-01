import server from "./server.ts";
import logger from "./utils/logger.ts";
import CacheManager from "./managers/CacheManager.ts";


CacheManager.load();
logger.clear();
server.start();