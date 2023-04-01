import AbstractCache from "./AbstractCache.ts";

class RedisCache extends AbstractCache {
  get(key: string): string {
    throw new Error("Method not implemented.");
  }
  set(key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  delete(key: string): void {
    throw new Error("Method not implemented.");
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
  has(key: string): boolean {
    throw new Error("Method not implemented.");
  }
  size(): number {
    throw new Error("Method not implemented.");
  }
  keys(): string[] {
    throw new Error("Method not implemented.");
  }
  values(): string[] {
    throw new Error("Method not implemented.");
  }
  entries(): [string, string][] {
    throw new Error("Method not implemented.");
  }
  forEach(
    callbackfn: (value: string, key: string, map: Map<string, string>) => void,
    thisArg?: string | undefined
  ): void {
    throw new Error("Method not implemented.");
  }
}

export default RedisCache;
