import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { payment } from '../interfaces/tebex.ts';
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { tebex } from "./axios.ts";

export async function generatePayment(username:string, packageID: number):Promise<payment> {
    const data:payment = {
        url: "",
        expires: ""
    }
    await tebex.post("checkout", {
        username: username,
        package_id: packageID
    }).then ((res) => {
        data.url = res.data.url
        data.expires = res.data.expires
    }).catch((err) => {
        console.log(err)
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
        console.log(err)
    })

    return newLink
}

export async function getCheckoutCookies(paymentLocationLink: string):Promise<string> {
    let cookies = ""
    await axiod.get(paymentLocationLink, {
        redirect: "manual",
        withCredentials: true
    }).then((res) => {
        cookies = res.headers.get("set-cookie") as unknown as string
    }).catch((err) => {
        console.log(err)
    })

    await axiod.get(Deno.env.get("TEBEX_STORE_URL")+"/checkout/basket", {
        redirect: "manual",
        headers: {
            "Cookie": cookies,
        },
        withCredentials: true
    }).catch((err) => {
        console.log(err)
    })

    return cookies
}

export async function generateTebexCheckout(cookies: string):Promise<string> {

    const finalCookies = getBuyCraftCookies(cookies)

    let checkout = ""
    await axiod.post(Deno.env.get("TEBEX_STORE_URL")+"/checkout/pay", {}, {
        redirect: "manual",
        headers: {
            "Cookie": finalCookies
        },
        withCredentials: true
    }).then((res) => {  
        checkout = res.headers.get("location") as string
    }).catch((err) => {
        console.log(err)
    })

    return checkout           
}

export function getBuyCraftCookies(cookies: string) {
    const buycraft_basket  = cookies.split("buycraft_basket=")[1].split(";")[0]
    const buycraft_basket_hash = cookies.split("buycraft_basket_hash=")[1].split(";")[0]

    return "buycraft_basket=" + buycraft_basket + "; buycraft_basket_hash=" + buycraft_basket_hash
}

export default async function name(username:string, packageID: number):Promise<string> {
    if(username === "" || packageID === 0) throw new Error("Invalid username or packageID")

    const payment = await generatePayment(username, packageID)
    // const location = await getCheckoutLocation(payment.url)
    // // const cookies = await getCheckoutCookies(location)
    // // const checkout = await generateTebexCheckout(cookies)
    return payment.url;
}