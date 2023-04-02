import logger from "../utils/logger.ts";
import { generatePayment } from "../requests/payments.ts";
import { getPackages } from "../requests/store.ts";

logger.info("Running payment tests...");
const id = await getPackages();
await generatePayment("Angelillo15", id[0].id)

logger.info("Payment test 1 passed");
logger.info("Finished payment tests.");