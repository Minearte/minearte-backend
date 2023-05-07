import { axiod } from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import axios from "npm:axios@1.3.4"
import "https://deno.land/x/dotenv@v3.2.2/load.ts";


export const tebex = axiod.create({
    baseURL:"https://plugin.tebex.io/",
    headers: {"X-Tebex-Secret":Deno.env.get("TEBEX_SECRET")},
    timeout: 5000,
    responseType: "json"
})

export default {
    axios,
    tebex
};