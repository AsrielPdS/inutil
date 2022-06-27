declare global {
  /**@deprecated */
  type num = number;
  type int = number;
  type float = number;
  type str = string;
  type bool = boolean;
  type Key = str | number;
  type Primitive = str | number | bool;
  type unk = unknown;
  type Task<T> = T | Promise<T>;

}

export declare function lazy2<T, K extends keyof T>(data: T, key: K): Exclude<T[K], () => any>;
export declare const lazy: <T>(value: T | (() => T)) => T;
export declare const is: <T>(value: unknown, constructor: new (...args: any[]) => T) => value is T;
export declare const isN: (value: unknown) => value is number;
export declare const isS: (value: unknown) => value is string;
export declare const isF: <T extends Function = Function>(value: unknown) => value is T;
/**get length of array */
export declare const l: <T>(a: ArrayLike<T>) => number;
/**get last item of array */
export declare const z: <T>(a: ArrayLike<T>) => T;
/**is not null neither white space VS=valid str*/
export declare function isVS(str: str): boolean;
/**is not false t=true*/
export declare const t: (value: unknown) => boolean;
export declare const def: <T>(value: T, def: T) => T;
export declare const isO: (value: unknown) => value is { [index: str]: any };
/** is valid (not null or undefined)*/
export declare const isV: (value: unknown) => bool;
/** is array */
export declare const isA: <T = unknown>(value: unknown) => value is T[];
/** is undefined */
export declare const isU: (value: unknown) => value is undefined;
/** is promise like */
export declare const isP: (value: any) => value is PromiseLike<any>;
/** get shallow copy of an object */
export declare const copy: <T extends object>(value: T) => {} & T;
export declare const isB: (value: unknown) => value is boolean;
export declare const arr: <T>(v: T | T[]) => T[];
export declare const has: (field: Key | symbol, obj: any) => boolean;
export declare function delay(index: number, cb: Function, time?: float): number;
export declare function async<T>(target: T, callback: (e: T) => any): T;
export declare const slip: (ms: number) => Promise<unknown>;
export declare const vals: <T>(obj: T) => any[];
export declare function ex<T>(value: T, extension: Partial<T>): T;
export declare function ex<T>(target: T, source: Partial<T>): T;
export declare function ex<T, U, V>(target: T, source1: U, source2: V): T & U & V;
export declare function ex<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
export declare function ex(target: object, s1: any, s2: any, s3: any, ...sources: any[]): any;
/**deep extend  */
export declare function deepEx<T>(obj: T, extension: Partial<T>): T;
export declare function add<T>(array: T[], ...items: T[]): T[];
export declare function call<T>(v: T, cb: (v: T) => any): T;
export declare const remove: (str: string, index: num, length: num) => string;
export declare function query<T>(pattern: str, list: Iterable<T>, ...fields: Array<keyof T>): T[];
/**
 *
 * @param ar
 * @param compareFn
 */
export declare function binarySearch<T>(ar: T[], compareFn: (value: T) => number): number;
/**true if is plain object */
export declare const isPlain: (o: unk) => boolean;
export declare function extend<T extends object, U extends object>(obj: T, extension: U): T & U;
export declare function deepSgn<T extends object, U extends object>(dest: T, src: U): T & U;
export declare function create<T extends Object>(constructor: new () => T, obj: Partial<T>): T;
export declare function plain<T>(src: T[][]): T[];
export declare function uuid(length?: number): string;
// export declare function fromForm<T = any>(data: FormData): Dic<any>;
export declare const notImp: () => Error;
export declare const notF: (key: Key, itemTp?: str, src?: str, srcTp?: str) => Error;
export declare const inv: (key?: Key) => Error;
export declare const json: (v: any) => string;
export declare function cacheArr<T>(max: int): T[];
export declare function byKey<T, K extends keyof T>(arr: ArrayLike<T>, name: T[K], key?: K): T;
export declare function sub<T, K extends keyof T>(arr: Array<T>, key: K): T[K][];
export declare function distinct<T>(arr: Array<T>): T[];
export declare function valid<T>(arr: Array<T>): T[];
export declare function iByKey(arr: any, name: any, key?: any, i?: number): number;
export declare const toStr: (v: any) => str;
export declare function raw(obj: unknown): string;
