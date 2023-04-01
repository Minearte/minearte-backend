import AbstractCache from "./AbstractCache.ts";

class InternalCache extends AbstractCache {
    cache:Map<string, string> = new Map<string, string>();

    get(key: string): string {
        return this.cache.get(key) || "";
    }
    set(key: string, value: string): void {
        this.cache.set(key, value);
    }
    delete(key: string): void {
        this.cache.delete(key);
    }
    clear(): void {
        this.cache.clear();
    }
    has(key: string): boolean {
        return this.cache.has(key);
    }
    size(): number {
        return this.cache.size;
    }
    keys(): string[] {
        return Array.from(this.cache.keys());
    }
    values(): string[] {
        return Array.from(this.cache.values());
    }
    entries(): [string, string][] {
        return Array.from(this.cache.entries());
    }
    forEach(
      callbackfn: (value: string, key: string, map: Map<string, string>) => void,
      thisArg?: string | undefined,
    ): void {
        this.cache.forEach(callbackfn, thisArg);
    }
}

export default InternalCache;
