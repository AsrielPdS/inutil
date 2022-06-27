//#region not very usefull
exports.lazy2 = (data, key) => {
  let t = data[key];
  return isF(t) ? (data[key] = t()) : t;
}
const check = (pattern, value) => ("" + value).toLowerCase().indexOf(pattern) >= 0;
// /**extract from enum */
// export ;
//#endregion
const
  /** is array */
  isA = (value) => Array.isArray(value),
  /** is undefined */
  isU = (value) => value === void 0,
  /**get length of array */
  l = (a) => a.length,
  isF = (value) => typeof value === 'function';

exports.isA = isA;
exports.isU = isU;
exports.l = l;
exports.isF = isF;

exports.lazy = (value) => isF(value) ? value() : value;
exports.is = (value, constructor) => value instanceof constructor;
exports.isN = (value) => typeof value === 'number';
exports.isS = (value) => typeof value === 'string';
/** is promise like */
exports.isP = (value) => value && isF(value.then);

/**get last item of array */
exports.z = (a) => a[l(a) - 1];
/**is not null neither white space VS=valid str*/
exports.isVS = (str) => {
  if (!str)
    return false;
  for (let i = 0; i < str.length; i++)
    if (str[i] != ' ')
      return false;
  return true;
}
/**is not false t=true*/
exports.t = (value) => value !== false;
exports.def = (value, def) => isU(value) ? def : value;
exports.isO = (value) => typeof value == 'object';
/** is valid (not null or undefined)*/
exports.isV = (value) => value != null;
/** get shallow copy of an object */
exports.copy = (value) => Object.assign({}, value);
exports.isB = (value) => typeof value === 'boolean';
exports.arr = (v) => isA(v) ? v : [v];
exports.has = (field, obj) => obj && field in obj;
exports.delay = (index, cb, time) => {
  clearTimeout(index);
  return setTimeout(cb, time);
}
exports.async = (target, callback) => {
  setTimeout(callback, 0, target);
  return target;
}
exports.slip = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.vals = (obj) => Object.values(obj);
exports.ex = (...v) => {
  return Object.assign(...v);
}
//  exports.deepEx=<T extends object>(obj: Partial<T>, extension: Partial<T>): T & U =>{
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
exports.deepEx = (obj, extension) => {
  for (let key in extension) {
    let t = obj[key], t2 = extension[key];
    t && isPlain(t2) ? deepEx(t, t2) : (obj[key] = t2);
  }
  return obj;
}
exports.add = (array, ...items) => {
  items.push(...items);
  return array;
}
exports.call = (v, cb) => {
  cb(v);
  return v;
}
exports.remove = (str, index, length) => str.slice(0, index) + str.slice(index + length);
exports.query = (pattern, list, ...fields) => {
  let r = [];
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
exports.binarySearch = (ar, compareFn) => {
  var m = 0;
  var n = ar.length - 1;
  while (m <= n) {
    var index = (n + m) >> 1;
    var cmp = compareFn(ar[index]);
    if (cmp > 0) {
      m = index + 1;
    }
    else if (cmp < 0) {
      n = index - 1;
    }
    else {
      return index;
    }
  }
  return -m - 1;
}
/**true if is plain object */
exports.isPlain = (o) => o ? Object.getPrototypeOf(o) === Object.prototype : false;
exports.extend = (obj, extension) => {
  for (let key in extension) {
    if (isU(obj[key]))
      obj[key] = extension[key];
  }
  return obj;
}
exports.deepSgn = (dest, src) => {
  for (let key in src) {
    let d = dest[key], s = src[key];
    if (isPlain(d) && isPlain(s))
      deepSgn(d, s);
    else
      dest[key] = s;
  }
  return dest;
}
exports.create = (constructor, obj) => {
  return Object.assign(new constructor(), obj);
}
exports.plain = (src) => {
  let t = [];
  for (let i of src)
    if (i)
      t.push(...i);
  return t;
}
exports.uuid = (length = 32) => {
  return Array
    .from({ length: length })
    .map(() => Math.round(Math.random() * 15).toString(16))
    .join('');
}
exports.fromForm = (data) => {
  var result = {};
  data.forEach((v, k) => result[k] = v);
  return result;
}
exports.notImp = () => new Error("not implemented");
exports.notF = (key, itemTp, src, srcTp) => new Error(`${itemTp || 'item'} '${key}' not found` + (src ? ` in '${src}' ${srcTp}` : ''));
exports.inv = (key) => new Error(`invalid action`);
exports.json = (v) => JSON.stringify(v);
exports.cacheArr = (max) => {
  let arr = [];
  arr.push = (...values) => {
    let r = (values.length + arr.length) - max;
    r > 0 && arr.splice(0, r);
    return Array.prototype.push.call(arr, ...values);
  };
  return arr;
}
exports.byKey = (arr, name, key = 'key') => {
  for (let i = 0; i < arr.length; i++)
    if (name === arr[i][key])
      return arr[i];
  return null;
}
exports.sub = (arr, key) => {
  var _a;
  let t = Array(arr.length);
  for (let i = 0; i < arr.length; i++)
    t[i] = (_a = arr[i]) === null || _a === void 0 ? void 0 : _a[key];
  return t;
}
exports.distinct = (arr) => {
  return arr.filter((f, i) => {
    return arr.indexOf(f, i + 1) == -1;
  });
}
exports.valid = (arr) => arr.filter(v => v != null);

exports.iByKey = (arr, name, key = 'key', i = 0) => {
  for (; i < arr.length; i++)
    if (name === arr[i][key])
      return i;
  return -1;
}
exports.toStr = (v) => isV(v) ? v + "" : "";
exports.toString = (obj) => {
  switch (typeof obj) {
    case "number":
    case "boolean":
    case "bigint":
      return obj + "";
    case "string":
      return `'${obj}'`;
    case "object":
      if (isA(obj))
        return `[${obj.map(raw)}]`;
      /**@type{string} */
      let t;
      for (let key in obj)
        t = (t ? t + "," : "{") + ((/^\w*$/).test(key) ? key : `"${key.replaceAll('"', '\"')}"`) + ':' + raw(obj[key]);
      return (t || '{') + "}";
  }
}
/**@param str{string} */
exports.fromString = (str,i={i:0}) => {
  // switch (str[i.i]) {
  //   case "{":
  //     break;
  //   case "[":
  //     break;
  //     case "'":
  //       while(i.i)
  //       break;
  // }
  // for (let i = 0; i < l(str.length);) {
    
  // }
}