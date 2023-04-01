export default abstract class AbstractCache {
    abstract get(key:string):string;
    abstract set(key:string, value:string):void;
    abstract delete(key:string):void;
    abstract clear():void;
    abstract has(key:string):boolean;
    abstract size():number;
    abstract keys():string[];
    abstract values():string[];
    abstract entries():[string, string][];
    abstract forEach(callbackfn:(value:string, key:string, map:Map<string, string>) => void, thisArg?:string):void;
    abstract [Symbol.iterator]():IterableIterator<[string, string]>;
    abstract [Symbol.toStringTag]:string;
}