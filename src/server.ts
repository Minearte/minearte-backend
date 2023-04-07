import express from "npm:express@4.18.2";
import bodyParser from "npm:body-parser"
import logger from "./utils/logger.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import routeLogger from "./utils/routeLogger.ts";
import storeRouter from "./router/storeRouter.ts";
import cors from "npm:cors@2.8.5"

const app:express = express();
const port = Deno.env.get("PORT") || 3000;

export default class Server {
    public static start():void {
        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
        app.use(bodyParser.json());
        app.use(cors());
        app.use(routeLogger);
        app.use("/store", storeRouter)
    }
}