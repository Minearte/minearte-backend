import CacheManager from "../managers/CacheManager.ts";
import AbstractCache from "./AbstractCache.ts";
import * as TebexRequests from "../requests/store.ts";
import category from "../interfaces/category.ts";

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

export default {
    getCategories,
    getCategory
}