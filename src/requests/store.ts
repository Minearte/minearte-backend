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