export default abstract class AbstractCache {
    abstract get(key:string):Promise<string>;
    abstract set(key:string, value:string):Promise<void>;
    abstract delete(key:string):Promise<void>;
    abstract clear():Promise<void>;
    abstract has(key:string):Promise<boolean>;
    abstract size():Promise<number>;
    abstract keys():Promise<string[]>;
    abstract values():Promise<string[]>;
    abstract entries():Promise<[string, string][]>;
    abstract forEach(callbackfn:(value:string, key:string, map:Map<string, string>) => void, thisArg?:string):Promise<void>;    
}