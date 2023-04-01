import AbstractCache from "./AbstractCache.ts";
import logger from "../utils/logger.ts";

class InternalCache extends AbstractCache {
  cache: Map<string, string> = new Map<string, string>();

  constructor() {
    super();
  }

  async get(key: string): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      const value = this.cache.get(key);
      if (value !== undefined) {
        resolve(value);
      } else {
        reject(`The key '${key}' does not exist in the cache.`);
      }
    });
  }

  async set(key: string, value: string): Promise<void> {
    return await new Promise<void>((resolve) => {
      this.cache.set(key, value);
      resolve();
    });
  }

  async delete(key: string): Promise<void> {
    return await new Promise<void>((resolve, reject) => {
      const result = this.cache.delete(key);
      if (result) {
        resolve();
      } else {
        reject(`The key '${key}' does not exist in the cache.`);
      }
    });
  }

  async clear(): Promise<void> {
    return await new Promise<void>((resolve) => {
      this.cache.clear();
      resolve();
    });
  }

  async has(key: string): Promise<boolean> {
    return await new Promise<boolean>((resolve) => {
      resolve(this.cache.has(key));
    });
  }

  async size(): Promise<number> {
    return await new Promise<number>((resolve) => {
      resolve(this.cache.size);
    });
  }

  async keys(): Promise<string[]> {
    return await new Promise<string[]>((resolve) => {
      resolve(Array.from(this.cache.keys()));
    });
  }

  async values(): Promise<string[]> {
    return await new Promise<string[]>((resolve) => {
      resolve(Array.from(this.cache.values()));
    });
  }

  async entries(): Promise<[string, string][]> {
    return await new Promise<[string, string][]>((resolve) => {
      resolve(Array.from(this.cache.entries()));
    });
  }

  async forEach(
    callbackfn: (value: string, key: string, map: Map<string, string>) => void,
    thisArg?: string | undefined
  ): Promise<void> {
    return await new Promise<void>((resolve) => {
      this.cache.forEach(callbackfn, thisArg);
      resolve();
    });
  }
}

export default InternalCache;
