import axios from './axios.ts';
import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { payment } from '../interfaces/tebex.ts';
import axiod from "https://deno.land/x/axiod/mod.ts";
import { tebex } from "./axios.ts";

export async function generatePayment(username:string, packageID: number):Promise<payment> {
    const data:payment = {
        url: "",
        expires: ""
    }
    await tebex.post("checkout", {
        username: username,
        package_id: packageID
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then ((res) => {
        data.url = res.data.url
        data.expires = res.data.expires
    }).catch((err) => {
        throw new Error(err)
    })

    return data
}

export async function getCheckoutLocation(paymentLink: string):Promise<string> {
    let newLink = ""
    await axiod.get(paymentLink, {
        redirect: "manual"
    }).then((res) => {
        newLink = res.headers.get("location") as string
    }).catch((err) => {
        throw new Error(err)
    })

    return newLink
}

export async function getCheckoutCookies(paymentLocationLink: string):Promise<string[]> {
    let cookies:string[] = []
    await axiod.get(paymentLocationLink, {
        redirect: "manual"
    }).then((res) => {
        cookies = res.headers.get("set-cookie") as unknown as string[]
    }).catch((err) => {
        throw new Error(err)
    })

    return cookies
}

export async function generateTebexCheckout(cookies: string[]):Promise<string> {
    let checkout = ""

    await axiod.post(Deno.env.get("TEBEX_STORE_URL")+"/checkout/pay", {}, {
        redirect: "manual",
        headers: {
            "Cookie": cookies
        }
    }).then((res) => {  
        checkout = res.headers.get("location") as string
    }).catch((err) => {
        throw new Error(err)
    })

    return checkout
            
}