import { tebex } from "./axios.ts";

export async function generatePayment(username:string, packageID: number) {
    await tebex.post("checkout", {
        username: username,
        package_id: packageID
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then ((res) => {
        console.log(res.data)
    }).catch((err) => {
        throw new Error(err)
    })
}