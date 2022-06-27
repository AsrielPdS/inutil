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
  type Arr<T> = T[] | T;
  type Task<T> = T | Promise<T>;
  interface Dic<T = any> { [key: string]: T; }

}
//#region not very usefull
export function lazy2<T, K extends keyof T>(data: T, key: K): Exclude<T[K], () => any> {
  let t = data[key] as any;
  return isF(t) ? (data[key] = t()) : t;
}
const check = (pattern: str, value) => ("" + value).toLowerCase().indexOf(pattern) >= 0;

// /**extract from enum */
// export ;
//#endregion
export const lazy = <T>(value: T | (() => T)) => isF(value) ? value() : value;


export const is = <T>(value: unknown, constructor: { new(...args): T }): value is T => value instanceof constructor;
export const isN = (value: unknown): value is number => typeof value === 'number';
export const isS = (value: unknown): value is str => typeof value === 'string';
export const isF = <T extends Function = Function>(value: unknown): value is T => typeof value === 'function';

/**get length of array */
export const l = <T>(a: ArrayLike<T>) => a.length;
/**get last item of array */
export const z = <T>(a: ArrayLike<T>) => a[l(a) - 1];

/**is not null neither white space VS=valid str*/
export function isVS(str: str) {
  if (!str) return false;
  for (let i = 0; i < str.length; i++)
    if (str[i] != ' ')
      return false;
  return true;
};
/**is not false t=true*/

export const t = (value: unknown) => value !== false;
export const def = <T>(value: T, def: T): T => isU(value) ? def : value;
export const isO = (value: unknown): value is Dic => typeof value == 'object';
/** is valid (not null or undefined)*/
export const isV = (value: unknown): bool => value != null;
/** is array */
export const isA = <T = unknown>(value: unknown): value is Array<T> => Array.isArray(value);
/** is undefined */
export const isU = (value: unknown): value is undefined => value === void 0;
/** is promise like */
export const isP = (value: any): value is PromiseLike<any> => value && isF(value.then);
/** get shallow copy of an object */
export const copy = <T extends object>(value: T) => Object.assign({}, value);
export const isB = (value: unknown): value is boolean => typeof value === 'boolean';

export const arr = <T>(v: T | T[]) => isA(v) ? v : [v];
export const has = (field: Key | symbol, obj: any) => obj && field in obj;
export function delay(index: number, cb: Function, time?: float) {
  clearTimeout(index);
  return setTimeout(cb, time);
}
export function async<T>(target: T, callback: (e: T) => any) {
  setTimeout(callback, 0, target);
  return target;
}
export const slip = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const vals = <T>(obj: T) => Object.values(obj);
export function ex<T>(value: T, extension: Partial<T>): T;
export function ex<T>(target: T, source: Partial<T>): T;
// export function ex<T, U>(target: T, source: U): T & U;
export function ex<T, U, V>(target: T, source1: U, source2: V): T & U & V;
export function ex<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
export function ex(target: object, s1: any, s2: any, s3: any, ...sources: any[]): any;
export function ex(...v) {
  return (Object.assign as any)(...v);
}
//  export function deepEx<T extends object>(obj: Partial<T>, extension: Partial<T>): T & U {
//    for (let key in extension) {
//      let value2 = extension[<str>key];

//      if (obj[<str>key] !== undefined) {
//        let value1 = obj[<str>key];
//        if (value2 && value2.__proto__ == Object.prototype && value1 && value1.__proto__ == Object.prototype) {
//          deepExtend(value1, value2);
//        }
//      } else if (value2 && value2.__proto__ == Object.prototype)
//        obj[<str>key] = clone(value2);
//      else obj[<str>key] = value2;

//    }
//    return <any>obj;
//  }
/**deep extend  */
export function deepEx<T>(obj: T, extension: Partial<T>): T {
  for (let key in extension) {
    let t = obj[key], t2 = extension[key];
    t && isPlain(t2) ? deepEx(t, t2) : (obj[key] = t2);
  }
  return <any>obj;
}

export function add<T>(array: T[], ...items: T[]) {
  items.push(...items);
  return array;
}
export function call<T>(v: T, cb: (v: T) => any): T {
  cb(v);
  return v;
}
export const remove = (str: str, index: num, length: num): str =>
  str.slice(0, index) + str.slice(index + length);

export function query<T>(pattern: str, list: Iterable<T>, ...fields: Array<keyof T>) {
  let r: T[] = [];
  for (let item of list)
    if (item && (fields.length ? fields.some(f => check(pattern, item[f])) : check(pattern, item)))
      r.push(item);

  return r;
}
/**
 * 
 * @param ar
 * @param compareFn
 */
export function binarySearch<T>(ar: T[], compareFn: (value: T) => number) {
  var m = 0;
  var n = ar.length - 1;
  while (m <= n) {
    var index = (n + m) >> 1;
    var cmp = compareFn(ar[index]);
    if (cmp > 0) {
      m = index + 1;
    } else if (cmp < 0) {
      n = index - 1;
    } else {
      return index;
    }
  }
  return -m - 1;
}
/**true if is plain object */
export const isPlain = (o: unk) => o ? Object.getPrototypeOf(o) === Object.prototype : false;
export function extend<T extends object, U extends object>(obj: T, extension: U): T & U {
  for (let key in extension) {
    if (obj[<any>key] === undefined)
      obj[<any>key] = extension[<any>key];
  }
  return <any>obj;
}
export function deepSgn<T extends object, U extends object>(dest: T, src: U): T & U {
  for (let key in src) {
    let d = dest[<any>key], s = src[key];
    if (isPlain(d) && isPlain(s))
      deepSgn<any, any>(d, s);
    else dest[<any>key] = s;
  }
  return <T & U>dest;
}
export function create<T extends Object>(constructor: new () => T, obj: Partial<T>): T {
  return Object.assign(new constructor(), obj);
}


export function plain<T>(src: T[][]) {
  let t: T[] = [];
  for (let i of src)
    if (i)
      t.push(...i);
  return t
}

export function up(value: str) {
  return value && (value[0].toUpperCase() + value.slice(1).replace(/_/g, ' '));
}
export function uuid(length = 32) {
  return Array
    .from({ length: length })
    .map(() => Math.round(Math.random() * 15).toString(16))
    .join('');
}

export function fromForm<T = any>(data: FormData) {
  var result: Dic = {};
  data.forEach((v, k) => result[k] = v);
  return result;
}




export const notImp = () => new Error("not implemented");
export const notF = (key: Key, itemTp?: str, src?: str, srcTp?: str) => new Error(`${itemTp || 'item'} '${key}' not found` + (src ? ` in '${src}' ${srcTp}` : ''));
export const inv = (key?: Key) => new Error(`invalid action`);
export const json = (v) => JSON.stringify(v);

export function cacheArr<T>(max: int) {
  let arr: T[] = [];
  arr.push = (...values: T[]) => {
    let r = (values.length + arr.length) - max;
    r > 0 && arr.splice(0, r);
    return Array.prototype.push.call(arr, ...values);
  };
  return arr;
}

export function byKey(arr: ArrayLike<any>, name, key = <any>'key') {
  for (let i = 0; i < arr.length; i++)
    if (name === arr[i][key])
      return arr[i];
  return null;
}
export function sub(arr: Array<any>, key) {
  let t = Array(arr.length);
  for (let i = 0; i < arr.length; i++)
    t[i] = arr[i]?.[key];
  return t;
}

export function distinct(arr: Array<any>) {
  return arr.filter((f, i) => {
    return arr.indexOf(f, i + 1) == -1;
  });
}
export function valid<T>(arr: Array<any>) {
  return arr.filter(v => isV(v));
}
export function iByKey(arr, name, key = <any>'key', i = 0) {
  for (; i < arr.length; i++)
    if (name === arr[i][key])
      return i;
  return -1;
}
export const toStr = (v: any): str => isV(v) ? v + "" : "";