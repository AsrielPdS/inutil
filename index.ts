
namespace _ {
  export const lazy = <T>(value: T | (() => T)) => isF(value) ? value() : value;
  export function lazy2<T, K extends keyof T>(data: T, key: K): Exclude<T[K], () => any> {
    let t = data[key] as any;
    return isF(t) ? (data[key] = t()) : t;
  }

  export const is = <T>(value: unknown, constructor: { new(...args): T }): value is T => value instanceof constructor;
  export function isN(value: unknown): value is number {
    return typeof value === 'number';
  }
  export const isS = (value: unknown): value is string => typeof value === 'string';
  export function isF<T extends Function = Function>(value: unknown): value is T {
    return typeof value === 'function';
  }


  /**is not null neither white space */
  export function isVS(str: str) {
    if (!str) return false;
    for (let i = 0; i < str.length; i++)
      if (str[i] != ' ')
        return false;
    return true;
  };
  export const t = (value: unknown) => value !== false;
  export const def = <T>(value: T, def: T): T => value === undefined ? def : value;
  export const isO = (value: unknown): value is object => value && typeof value == 'object';
  export const isA = <T = unknown>(value: unknown): value is Array<T> => value instanceof Array;
  export const isU = (value: unknown): value is undefined => value === void 0;
  /** is promise like */
  export const isP = (value: any): value is PromiseLike<any> => isF(value.then);
  export const isB = (value: unknown): value is boolean => typeof value === 'boolean';

  export function clone<T extends Object>(obj: T): T {
    if (typeof obj === 'object') {
      let nObj: any;
      if (obj instanceof Array) {
        nObj = Array(obj.length);
        for (let i = 0; i < obj.length; i++)
          nObj[i] = clone(obj[i]);
      } else {
        nObj = {};
        for (let key in obj)
          nObj[key] = clone(obj[key]);
      }
      obj = nObj;
    }
    return obj;
  }
  export const arr = <T>(v: T | T[]) => isA(v) ? v : [v];
  export const has = <T extends number>(value: T, check: T) => (value & check) == check;
  export function delay(index: number, cb: Function, time = 500) {
    clearTimeout(index);
    return setTimeout(cb, time);
  }
  export const slip = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  export const clamp = <T>(value: T, min: T, max: T) => value < min ? min : value > max ? max : value;

  export const ex = <T>(value: T, extension: Partial<T>) => Object.assign(value, extension);
  export function sgn<T, U>(target: T, source: U): T & U;
  export function sgn<T, U, V>(target: T, source1: U, source2: V): T & U & V;
  export function sgn<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
  export function sgn(target: object, ...sources: any[]): any;
  export function sgn(tgt, ...src: any[]) { return Object.assign(tgt, ...src); }
  export function fn<T>(v: T, cb: (v: T) => any): T {
    cb(v);
    return v;
  }

  export const remove = (str: str, index: num, length: num): str =>
    str.slice(0, index) + str.slice(index + length);

  const check = (pattern: string, value) => ("" + value).toLowerCase().indexOf(pattern) >= 0;
  export function query<T>(pattern: string, list: Iterable<T>, ...fields: Array<keyof T>) {
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
  export function extend<T extends object, U extends object>(obj: T, extension: U): T & U {
    for (let key in extension) {
      if (obj[<string>key] === undefined)
        obj[<string>key] = extension[<string>key];
    }
    return <any>obj;
  }
  export function deepExtend<T extends object, U extends object>(obj: T, extension: U): T & U {
    for (let key in extension) {
      let value2 = extension[<string>key];

      if (obj[<string>key] !== undefined) {
        let value1 = obj[<string>key];
        if (value2 && value2.__proto__ == Object.prototype && value1 && value1.__proto__ == Object.prototype) {
          deepExtend(value1, value2);
        }
      } else if (value2 && value2.__proto__ == Object.prototype)
        obj[<string>key] = clone(value2);
      else obj[<string>key] = value2;

    }
    return <any>obj;
  }

  export function prot<T extends Object>(constructor: new () => T, obj: Partial<T>): T {
    return Object.assign(new constructor(), obj);
  }

  export function plain<T>(src: T[][]) {
    let t: T[] = [];
    for (let i of src)
      if (i)
        t.push(...i);
    return t
  }

  export function up(value: string) {
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

  export interface EventListenerOptions {
    delay?: number,
    once?: boolean,
    passive?: boolean;
  }
  export type EventTargetCallback<T, E = any> = ((this: T, e: E) => any) & { options?: EventListenerOptions; };
  /**event target */
  export class ET<T extends Dic = Dic> {
    /**event handlers */
    readonly __eh: Dic<EventTargetCallback<this>[]> = {};

    on<K extends keyof T>(event: K, callback: EventTargetCallback<this, T[K]>, options?: EventListenerOptions): this {
      if (callback) {
        if (!(event in this.__eh)) {
          this.__eh[<any>event] = [];
        }
        if (options)
          callback.options = options;

        this.__eh[<any>event].push(callback);
      }
      return this;
    }

    off<K extends keyof T>(event: K, callback?: EventTargetCallback<this, T[K]>) {
      if (event in this.__eh) {

        if (callback) {
          var stack = this.__eh[<any>event];
          for (let i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
              stack.splice(i, 1);
              return;
            }
          }
        } else delete this.__eh[<any>event];
      }
      return this;
    }

    trigger<K extends keyof T>(event: K, data?: T[K]) {
      let stack = this.__eh[<any>event];
      if (stack && stack.length) {
        for (let i = 0, l = stack.length; i < l; i++) {
          let e = stack[i];
          if (e.options) {
            if (e.options.once)
              stack.splice(i--, 1);
            if (e.options.delay) {
              setTimeout(() => {
                e.call(this, data);
              }, e.options.delay);
              continue;
            }
          }

          if (e.call(this, data) === false)
            return false;
        }
      } else return -1;
      return true;
    }
  }


  export function isEmpty(obj: object) {
    for (let _k in obj)
      return false;
    return true;
  }

  export const notImp = () => new Error("not implemented");
  export const notF = (key: Key, itemTp?: str, src?: str, srcTp?: str) => new Error(`${itemTp || 'item'} '${key}' not found` + (src ? ` in '${src}' ${srcTp}` : ''));
  export const inv = (key?: Key) => new Error(`invalid action`);


  export function expand() {

    String.prototype.padStart ||= function (this: string, length, pattern) {
      return this.length <= length ? this : (pattern.repeat(length - this.length) + this);
    };
    String.prototype.replaceAll ||= function (this, from, to) {
      return this.split(from).join(to)
    }
    Array.prototype.byKey = function (this: Array<any>, name, key = <any>'key') {
      for (let i = 0; i < this.length; i++)
        if (name === this[i][key])
          return this[i];
      return null;
    };
    Array.prototype.sub = function (this: Array<any>, key) {
      let t = Array(this.length);
      for (let i = 0; i < this.length; i++)
        t[i] = this[i]?.[key];
      return t;
    };
    Object.defineProperties(Array.prototype, {
      a: {
        get(this: Array<any>) {
          return this[0];
        },
        set(this: Array<any>, value) {
          this[0] = value;
        }
      },
      z: {
        get(this: Array<any>) {
          return this[this.length - 1];
        },
        set(this: Array<any>, value) {
          this[this.length - 1] = value;
        }
      },
      l: {
        get(this: Array<any>) {
          return this.length;
        },
        set(this: Array<any>, value) {
          this.length = value;
        }
      }
    });

    Array.prototype.distinct = function (this: Array<any>) {
      return this.filter((f, i) => {
        return this.indexOf(f, i + 1) == -1;
      });
    };
    Array.prototype.valid = function (this: Array<any>) {
      return this.filter(v => v);
    };
    Array.prototype.indexByKey = function (this, name, key = <any>'key', i = 0) {
      for (; i < this.length; i++)
        if (name === this[i][key])
          return i;
      return -1;
    };
    Array.prototype.dic = function <U>(this: Array<any>, callback: (value: any) => [string, U]): Dic<U> {
      var result = {};
      for (let i = 0; i < this.length; i++) {
        let value = this[i];
        let temp = callback(value);
        result[temp[0]] = temp[1];
      }
      return result;
    };
    Array.prototype.add = function (...value) {
      this.push(...value);
      return this;
    };
    Array.prototype.put = function (index, ...value) {
      this.splice(index, 0, ...value);
      return this;
    };
    Array.prototype.cut = function (this: Array<unknown>, count: number): unknown[][] {
      let r = Array(Math.ceil(this.length / count));

      for (let i = 0; i < r.length;)
        r[i] = this.slice(i * count, ++i * count)
      return r;
    };
  }
}

export = _;
declare global {
  type num = number;
  type str = string;
  type bool = boolean;
  type Key = string | number;
  type Primitive = string | number | boolean;
  type unk = unknown;

  type Task<T> = T | Promise<T>;
  interface Dic<T = any> { [key: string]: T; }


  interface Array<T> {
    //remove(...item: T[]): boolean
    byKey<K extends keyof T>(value, key?: K): T;
    sub<K extends keyof T>(key: K): T[K][];
    indexByKey<K extends keyof T>(value, key?: K, fromIndex?: number): number;
    distinct(): T[];
    cut(count: number): T[][];
    valid(): T[];
    add(...value: T[]): this;
    put?(index: num, ...value: T[]): this;

    /**return first element */
    a: T;
    /**return length element */
    l: number;
    /**return last element */
    z: T;
    /**
      * map array to dictionary
      * @param callback
      */
    dic<U>(callback: (value: T) => [string, U]): Dic<U>;
    //extract<>(field: K): T[K][];

  }
}


