import { tebex } from '../requests/axios.ts'
import logger from "../utils/logger.ts";

logger.info("Running tebex tests...");

await tebex.get("packages?verbose=true").then((res) => {
    console.log(res.data)
}).catch((err) => {
    logger.error(err);
    throw err;
});

logger.info("Finished tebex tests.");

