import { tebex } from '../requests/axios.ts'
import logger from "../utils/logger.ts";
import {getCategories, getCategory} from "../requests/store.ts";
logger.info("Running tebex tests...");

await tebex.get("packages?verbose=true").then((_res) => {
    logger.info("tebex test 1 passed");
}).catch((err) => {
    logger.error(err);
    throw err;
});

const categories = await getCategories()

console.log(categories)

logger.info("tebex test 2 passed");

console.log(await getCategory(categories[0].id))

logger.info("tebex test 3 passed");

logger.info("Finished tebex tests.");

