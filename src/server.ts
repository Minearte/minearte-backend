import express from "npm:express@4.18.2";
import logger from "./utils/logger.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import routeLogger from "./utils/routeLogger.ts";

const app:express = express();
const port = Deno.env.get("PORT") || 3000;

export default class Server {
    public static start():void {
        app.listen(port, () => {
            logger.clear();
            logger.info(`Server is running on port ${port}`);
        });

        app.use(routeLogger);
    }
}