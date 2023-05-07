import { sale, completeSale } from '../interfaces/tebex.ts';
import { packages } from '../interfaces/tebex.ts';
import { tebex } from './axios.ts';
import categories from "../interfaces/category.ts";

export async function getCategories():Promise<categories[]> {
    const categoriesMap:Map<number, categories> = new Map<number, categories>

    await tebex.get("packages?verbose=true").then((res) => {
        res.data.forEach((category: packages) => {
            if (categoriesMap.has(category.category.id)) {
                categoriesMap.get(category.category.id)?.packages.push(category.id)
                return;
            }

            categoriesMap.set(category.category.id, {
                id: category.category.id,
                name: category.category.name,
                packages: [category.id]
            })
        })
    }).catch((e) => {
        console.log(e);
    })

    return Array.from(categoriesMap.values())
}

export async function getCategory(id: number) {
    const categories = await getCategories()
    return categories.find((category) => category.id === id)
}

export async function getPackages():Promise<packages[]> {
    const packages:packages[] = []
    await tebex.get("packages?verbose=true").then((res) => {
        res.data.forEach((p: packages) => {
            packages.push(p)
        })
    })

    return packages
}

export async function getRecentSales():Promise<sale[]> {
    const sales:sale[] = []
    let counter = 0
    await tebex.get("payments?limit=10").then((res) => {
        res.data.forEach((sale: completeSale) => {
            if (counter >= 5) return;
            sales.push({
                "player": sale.player.name,
                "package": sale.packages[0].name,
            })
            counter++
        })
    })

    return sales
}
