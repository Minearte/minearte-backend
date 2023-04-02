import logger from "../utils/logger.ts";
import { generatePayment, getCheckoutLocation, getCheckoutCookies, generateTebexCheckout } from "../requests/payments.ts";
import { getPackages } from "../requests/store.ts";
import axios from "../requests/axios.ts";

logger.info("Running payment tests...");
const id = await getPackages();
const payment = await generatePayment("Angelillo15", id[0].id)

logger.info("Payment test 1 passed");

const location = await getCheckoutLocation(payment.url)

logger.info("Payment test 2 passed");

const cookies = await getCheckoutCookies(location)

logger.info("Payment test 3 passed");

const checkout = await generateTebexCheckout(cookies)

console.log(checkout)
logger.info("Payment test 4 passed");

axios.axios.get(checkout, {
    
}).then((res) => {
    console.log(res.data)
}).catch((err) => {
    throw new Error(err)
})



logger.info("Finished payment tests.");