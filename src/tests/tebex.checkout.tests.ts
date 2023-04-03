import logger from "../utils/logger.ts";
import { generatePayment, getCheckoutLocation, getCheckoutCookies, generateTebexCheckout } from "../requests/payments.ts";
import payments from "../requests/payments.ts";
import { getPackages } from "../requests/store.ts";

logger.info("Running payment tests...");
const id = await getPackages();
const payment = await generatePayment("Angelillo15", id[0].id)

logger.info("Payment test 1 passed");

const location = await getCheckoutLocation(payment.url)

logger.info("Payment test 2 passed");

const cookies = await getCheckoutCookies(location)

logger.info("Payment test 3 passed");

const checkout = await generateTebexCheckout(cookies)

logger.info("Payment test 4 passed");

logger.info("Payment link: " + checkout);

await payments("Angelillo15", id[0].id)

console.log(id[0].id)

logger.info ("Payment test 5 passed");

logger.info("Finished payment tests.");
