import CacheManager from "../managers/CacheManager.ts";
import AbstractCache from "./AbstractCache.ts";
import * as TebexRequests from "../requests/store.ts";
import category from "../interfaces/category.ts";
import {packages} from "../interfaces/tebex.ts";

export async function getCategories() {
    const cache:AbstractCache = CacheManager.getCache()
    const exists = await cache.has("categories");
    
    if (exists) {
        const categories = await cache.get("categories");
        return JSON.parse(categories);
    }

    const tebex = await TebexRequests.getCategories();

    await cache.set("categories", JSON.stringify(tebex));

    return tebex;
}

export async function getCategory(id: number) {
    const categories = await getCategories()
    return categories.find((category: category) => category.id === id)
}

export async function getPackages() {
    const cache:AbstractCache = CacheManager.getCache()
    const exists = await cache.has("packages");

    if (exists) {
        const packages = await cache.get("packages");
        return JSON.parse(packages);
    }

    const tebex = await TebexRequests.getPackages();

    await cache.set("packages", JSON.stringify(tebex));

    return tebex;

}

export async function getPackage(id: number) {
    const p = await getPackages()
    return p.find((p: packages) => p.id === id)
}

export async function getRecentSales() {
    const cache:AbstractCache = CacheManager.getCache()
    const exists = await cache.has("sales");

    if (exists) {
        const sales = await cache.get("sales");
        return JSON.parse(sales);
    }

    const tebex = await TebexRequests.getRecentSales();

    await cache.set("sales", JSON.stringify(tebex));

    return tebex;

}

export default {
    getCategories,
    getCategory,
    getPackages,
    getPackage,
    getRecentSales
}