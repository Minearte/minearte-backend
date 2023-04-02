import question from "https://raw.githubusercontent.com/ocpu/question-deno/master/mod.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts";
import logger from "../utils/logger.ts";

// Check if the .env file exists
const envExists = await Deno.stat(".env")
  .then(() => true)
  .catch(() => false);

if (envExists) {
  const result = await question("confirm", "The .env file already exists, you want to reconfigure?", false);
  if (result === undefined) {
    logger.info("Exiting...");
    Deno.exit(0);
  }
  else if (result) {
    Deno.remove(".env");
    logger.info("Removed .env file");
  }
  else {
    logger.info("Exiting...");
    Deno.exit(0);
  }
}

logger.info("Starting configuration...");
await Deno.copyFile(".env.example", ".env")
logger.info("Copied .env.example to .env");
logger.info("")
logger.info("Please fill in the .env file with your data");
logger.info("Press enter to continue...");
await Deno.stdin.read(new Uint8Array(1024));
await load();
