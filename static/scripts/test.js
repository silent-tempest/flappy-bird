(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/**
 * A lightweight implementation of Node.js EventEmitter.
 * @constructor LightEmitter
 * @example
 * var LightEmitter = require( 'light_emitter' );
 */
function LightEmitter () {}

LightEmitter.prototype = {
  /**
   * @method LightEmitter#emit
   * @param {string} type
   * @param {...any} [data]
   * @chainable
   */
  emit: function emit ( type ) {
    var list = _getList( this, type );
    var data, i, l;

    if ( ! list ) {
      return this;
    }

    if ( arguments.length > 1 ) {
      data = [].slice.call( arguments, 1 );
    }

    for ( i = 0, l = list.length; i < l; ++i ) {
      if ( ! list[ i ].active ) {
        continue;
      }

      if ( list[ i ].once ) {
        list[ i ].active = false;
      }

      if ( data ) {
        list[ i ].listener.apply( this, data );
      } else {
        list[ i ].listener.call( this );
      }
    }

    return this;
  },

  /**
   * @method LightEmitter#off
   * @param {string}   [type]
   * @param {function} [listener]
   * @chainable
   */
  off: function off ( type, listener ) {
    var list, i;

    if ( ! type ) {
      this._events = null;
    } else if ( ( list = _getList( this, type ) ) ) {
      if ( listener ) {
        for ( i = list.length - 1; i >= 0; --i ) {
          if ( list[ i ].listener === listener && list[ i ].active ) {
            list[ i ].active = false;
          }
        }
      } else {
        list.length = 0;
      }
    }

    return this;
  },

  /**
   * @method LightEmitter#on
   * @param {string}   type
   * @param {function} listener
   * @chainable
   */
  on: function on ( type, listener ) {
    _on( this, type, listener );
    return this;
  },

  /**
   * @method LightEmitter#once
   * @param {string}   type
   * @param {function} listener
   * @chainable
   */
  once: function once ( type, listener ) {
    _on( this, type, listener, true );
    return this;
  },

  constructor: LightEmitter
};

/**
 * @private
 * @method _on
 * @param  {LightEmitter} self
 * @param  {string}       type
 * @param  {function}     listener
 * @param  {boolean}      once
 * @return {void}
 */
function _on ( self, type, listener, once ) {
  var entity = {
    listener: listener,
    active:   true,
    type:     type,
    once:     once
  };

  if ( ! self._events ) {
    self._events = Object.create( null );
  }

  if ( ! self._events[ type ] ) {
    self._events[ type ] = [];
  }

  self._events[ type ].push( entity );
}

/**
 * @private
 * @method _getList
 * @param  {LightEmitter}   self
 * @param  {string}         type
 * @return {array<object>?}
 */
function _getList ( self, type ) {
  return self._events && self._events[ type ];
}

module.exports = LightEmitter;

},{}],2:[function(require,module,exports){
'use strict';
var toString = Object.prototype.toString;
module.exports = function _throwArgumentException(unexpected, expected) {
    throw Error('"' + toString.call(unexpected) + '" is not ' + expected);
};
},{}],3:[function(require,module,exports){
'use strict';
var type = require('./type');
var lastRes = 'undefined';
var lastVal;
module.exports = function _type(val) {
    if (val === lastVal) {
        return lastRes;
    }
    return lastRes = type(lastVal = val);
};
},{"./type":58}],4:[function(require,module,exports){
'use strict';
module.exports = function _unescape(string) {
    return string.replace(/\\(\\)?/g, '$1');
};
},{}],5:[function(require,module,exports){
'use strict';
var isset = require('../isset');
var undefined;
var defineGetter = Object.prototype.__defineGetter__, defineSetter = Object.prototype.__defineSetter__;
function baseDefineProperty(object, key, descriptor) {
    var hasGetter = isset('get', descriptor), hasSetter = isset('set', descriptor), get, set;
    if (hasGetter || hasSetter) {
        if (hasGetter && typeof (get = descriptor.get) !== 'function') {
            throw TypeError('Getter must be a function: ' + get);
        }
        if (hasSetter && typeof (set = descriptor.set) !== 'function') {
            throw TypeError('Setter must be a function: ' + set);
        }
        if (isset('writable', descriptor)) {
            throw TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
        }
        if (defineGetter) {
            if (hasGetter) {
                defineGetter.call(object, key, get);
            }
            if (hasSetter) {
                defineSetter.call(object, key, set);
            }
        } else {
            throw Error('Cannot define getter or setter');
        }
    } else if (isset('value', descriptor)) {
        object[key] = descriptor.value;
    } else if (!isset(key, object)) {
        object[key] = undefined;
    }
    return object;
}
module.exports = baseDefineProperty;
},{"../isset":42}],6:[function(require,module,exports){
'use strict';
module.exports = function baseExec(regexp, string) {
    var result = [], value;
    regexp.lastIndex = 0;
    while (value = regexp.exec(string)) {
        result.push(value);
    }
    return result;
};
},{}],7:[function(require,module,exports){
'use strict';
var callIteratee = require('../call-iteratee'), isset = require('../isset');
module.exports = function baseForEach(arr, fn, ctx, fromRight) {
    var i, j, idx;
    for (i = -1, j = arr.length - 1; j >= 0; --j) {
        if (fromRight) {
            idx = j;
        } else {
            idx = ++i;
        }
        if (isset(idx, arr) && callIteratee(fn, ctx, arr[idx], idx, arr) === false) {
            break;
        }
    }
    return arr;
};
},{"../call-iteratee":15,"../isset":42}],8:[function(require,module,exports){
'use strict';
var callIteratee = require('../call-iteratee');
module.exports = function baseForIn(obj, fn, ctx, fromRight, keys) {
    var i, j, key;
    for (i = -1, j = keys.length - 1; j >= 0; --j) {
        if (fromRight) {
            key = keys[j];
        } else {
            key = keys[++i];
        }
        if (callIteratee(fn, ctx, obj[key], key, obj) === false) {
            break;
        }
    }
    return obj;
};
},{"../call-iteratee":15}],9:[function(require,module,exports){
'use strict';
var isset = require('../isset');
module.exports = function baseGet(obj, path, off) {
    var l = path.length - off, i = 0, key;
    for (; i < l; ++i) {
        key = path[i];
        if (isset(key, obj)) {
            obj = obj[key];
        } else {
            return;
        }
    }
    return obj;
};
},{"../isset":42}],10:[function(require,module,exports){
'use strict';
var baseToIndex = require('./base-to-index');
var indexOf = Array.prototype.indexOf, lastIndexOf = Array.prototype.lastIndexOf;
function baseIndexOf(arr, search, fromIndex, fromRight) {
    var l, i, j, idx, val;
    if (search === search && (idx = fromRight ? lastIndexOf : indexOf)) {
        return idx.call(arr, search, fromIndex);
    }
    l = arr.length;
    if (!l) {
        return -1;
    }
    j = l - 1;
    if (typeof fromIndex !== 'undefined') {
        fromIndex = baseToIndex(fromIndex, l);
        if (fromRight) {
            j = Math.min(j, fromIndex);
        } else {
            j = Math.max(0, fromIndex);
        }
        i = j - 1;
    } else {
        i = -1;
    }
    for (; j >= 0; --j) {
        if (fromRight) {
            idx = j;
        } else {
            idx = ++i;
        }
        val = arr[idx];
        if (val === search || search !== search && val !== val) {
            return idx;
        }
    }
    return -1;
}
module.exports = baseIndexOf;
},{"./base-to-index":13}],11:[function(require,module,exports){
'use strict';
var baseIndexOf = require('./base-index-of');
var support = require('../support/support-keys');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var k, fixKeys;
if (support === 'not-supported') {
    k = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ];
    fixKeys = function fixKeys(keys, object) {
        var i, key;
        for (i = k.length - 1; i >= 0; --i) {
            if (baseIndexOf(keys, key = k[i]) < 0 && hasOwnProperty.call(object, key)) {
                keys.push(key);
            }
        }
        return keys;
    };
}
module.exports = function baseKeys(object) {
    var keys = [];
    var key;
    for (key in object) {
        if (hasOwnProperty.call(object, key)) {
            keys.push(key);
        }
    }
    if (support !== 'not-supported') {
        return keys;
    }
    return fixKeys(keys, object);
};
},{"../support/support-keys":53,"./base-index-of":10}],12:[function(require,module,exports){
'use strict';
var get = require('./base-get');
module.exports = function baseProperty(object, path) {
    if (object != null) {
        if (path.length > 1) {
            return get(object, path, 0);
        }
        return object[path[0]];
    }
};
},{"./base-get":9}],13:[function(require,module,exports){
'use strict';
module.exports = function baseToIndex(v, l) {
    if (!l || !v) {
        return 0;
    }
    if (v < 0) {
        v += l;
    }
    return v || 0;
};
},{}],14:[function(require,module,exports){
'use strict';
var _throwArgumentException = require('./_throw-argument-exception');
var defaultTo = require('./default-to');
module.exports = function before(n, fn) {
    var value;
    if (typeof fn !== 'function') {
        _throwArgumentException(fn, 'a function');
    }
    n = defaultTo(n, 1);
    return function () {
        if (--n >= 0) {
            value = fn.apply(this, arguments);
        }
        return value;
    };
};
},{"./_throw-argument-exception":2,"./default-to":24}],15:[function(require,module,exports){
'use strict';
module.exports = function callIteratee(fn, ctx, val, key, obj) {
    if (typeof ctx === 'undefined') {
        return fn(val, key, obj);
    }
    return fn.call(ctx, val, key, obj);
};
},{}],16:[function(require,module,exports){
'use strict';
var baseExec = require('./base/base-exec'), _unescape = require('./_unescape'), isKey = require('./is-key'), toKey = require('./to-key'), _type = require('./_type');
var rProperty = /(^|\.)\s*([_a-z]\w*)\s*|\[\s*((?:-)?(?:\d+|\d*\.\d+)|("|')(([^\\]\\(\\\\)*|[^\4])*)\4)\s*\]/gi;
function stringToPath(str) {
    var path = baseExec(rProperty, str), i = path.length - 1, val;
    for (; i >= 0; --i) {
        val = path[i];
        if (val[2]) {
            path[i] = val[2];
        } else if (val[5] != null) {
            path[i] = _unescape(val[5]);
        } else {
            path[i] = val[3];
        }
    }
    return path;
}
function castPath(val) {
    var path, l, i;
    if (isKey(val)) {
        return [toKey(val)];
    }
    if (_type(val) === 'array') {
        path = Array(l = val.length);
        for (i = l - 1; i >= 0; --i) {
            path[i] = toKey(val[i]);
        }
    } else {
        path = stringToPath('' + val);
    }
    return path;
}
module.exports = castPath;
},{"./_type":3,"./_unescape":4,"./base/base-exec":6,"./is-key":34,"./to-key":56}],17:[function(require,module,exports){
'use strict';
module.exports = function clamp(value, lower, upper) {
    if (value >= upper) {
        return upper;
    }
    if (value <= lower) {
        return lower;
    }
    return value;
};
},{}],18:[function(require,module,exports){
'use strict';
var create = require('./create'), getPrototypeOf = require('./get-prototype-of'), toObject = require('./to-object'), each = require('./each'), isObjectLike = require('./is-object-like');
module.exports = function clone(deep, target, guard) {
    var cln;
    if (typeof target === 'undefined' || guard) {
        target = deep;
        deep = true;
    }
    cln = create(getPrototypeOf(target = toObject(target)));
    each(target, function (value, key, target) {
        if (value === target) {
            this[key] = this;
        } else if (deep && isObjectLike(value)) {
            this[key] = clone(deep, value);
        } else {
            this[key] = value;
        }
    }, cln);
    return cln;
};
},{"./create":20,"./each":27,"./get-prototype-of":30,"./is-object-like":36,"./to-object":57}],19:[function(require,module,exports){
'use strict';
module.exports = {
    ERR: {
        INVALID_ARGS: 'Invalid arguments',
        FUNCTION_EXPECTED: 'Expected a function',
        STRING_EXPECTED: 'Expected a string',
        UNDEFINED_OR_NULL: 'Cannot convert undefined or null to object',
        REDUCE_OF_EMPTY_ARRAY: 'Reduce of empty array with no initial value',
        NO_PATH: 'No path was given'
    },
    MAX_ARRAY_LENGTH: 4294967295,
    MAX_SAFE_INT: 9007199254740991,
    MIN_SAFE_INT: -9007199254740991,
    DEEP: 1,
    DEEP_KEEP_FN: 2,
    PLACEHOLDER: {}
};
},{}],20:[function(require,module,exports){
'use strict';
var defineProperties = require('./define-properties');
var setPrototypeOf = require('./set-prototype-of');
var isPrimitive = require('./is-primitive');
function C() {
}
module.exports = Object.create || function create(prototype, descriptors) {
    var object;
    if (prototype !== null && isPrimitive(prototype)) {
        throw TypeError('Object prototype may only be an Object or null: ' + prototype);
    }
    C.prototype = prototype;
    object = new C();
    C.prototype = null;
    if (prototype === null) {
        setPrototypeOf(object, null);
    }
    if (arguments.length >= 2) {
        defineProperties(object, descriptors);
    }
    return object;
};
},{"./define-properties":26,"./is-primitive":39,"./set-prototype-of":51}],21:[function(require,module,exports){
'use strict';
var baseForEach = require('../base/base-for-each'), baseForIn = require('../base/base-for-in'), isArrayLike = require('../is-array-like'), toObject = require('../to-object'), iteratee = require('../iteratee').iteratee, keys = require('../keys');
module.exports = function createEach(fromRight) {
    return function each(obj, fn, ctx) {
        obj = toObject(obj);
        fn = iteratee(fn);
        if (isArrayLike(obj)) {
            return baseForEach(obj, fn, ctx, fromRight);
        }
        return baseForIn(obj, fn, ctx, fromRight, keys(obj));
    };
};
},{"../base/base-for-each":7,"../base/base-for-in":8,"../is-array-like":32,"../iteratee":43,"../keys":44,"../to-object":57}],22:[function(require,module,exports){
'use strict';
module.exports = function createGetElementDimension(name) {
    return function (e) {
        var v, b, d;
        if (e.window === e) {
            v = Math.max(e['inner' + name] || 0, e.document.documentElement['client' + name]);
        } else if (e.nodeType === 9) {
            b = e.body;
            d = e.documentElement;
            v = Math.max(b['scroll' + name], d['scroll' + name], b['offset' + name], d['offset' + name], b['client' + name], d['client' + name]);
        } else {
            v = e['client' + name];
        }
        return v;
    };
};
},{}],23:[function(require,module,exports){
'use strict';
var castPath = require('../cast-path'), noop = require('../noop');
module.exports = function createProperty(baseProperty, useArgs) {
    return function (path) {
        var args;
        if (!(path = castPath(path)).length) {
            return noop;
        }
        if (useArgs) {
            args = Array.prototype.slice.call(arguments, 1);
        }
        return function (object) {
            return baseProperty(object, path, args);
        };
    };
};
},{"../cast-path":16,"../noop":47}],24:[function(require,module,exports){
'use strict';
module.exports = function defaultTo(value, defaultValue) {
    if (value != null && value === value) {
        return value;
    }
    return defaultValue;
};
},{}],25:[function(require,module,exports){
'use strict';
var mixin = require('./mixin'), clone = require('./clone');
module.exports = function defaults(defaults, object) {
    if (object == null) {
        return clone(true, defaults);
    }
    return mixin(true, clone(true, defaults), object);
};
},{"./clone":18,"./mixin":46}],26:[function(require,module,exports){
'use strict';
var support = require('./support/support-define-property');
var defineProperties, baseDefineProperty, isPrimitive, each;
if (support !== 'full') {
    isPrimitive = require('./is-primitive');
    each = require('./each');
    baseDefineProperty = require('./base/base-define-property');
    defineProperties = function defineProperties(object, descriptors) {
        if (support !== 'not-supported') {
            try {
                return Object.defineProperties(object, descriptors);
            } catch (e) {
            }
        }
        if (isPrimitive(object)) {
            throw TypeError('defineProperties called on non-object');
        }
        if (isPrimitive(descriptors)) {
            throw TypeError('Property description must be an object: ' + descriptors);
        }
        each(descriptors, function (descriptor, key) {
            if (isPrimitive(descriptor)) {
                throw TypeError('Property description must be an object: ' + descriptor);
            }
            baseDefineProperty(this, key, descriptor);
        }, object);
        return object;
    };
} else {
    defineProperties = Object.defineProperties;
}
module.exports = defineProperties;
},{"./base/base-define-property":5,"./each":27,"./is-primitive":39,"./support/support-define-property":52}],27:[function(require,module,exports){
'use strict';
module.exports = require('./create/create-each')();
},{"./create/create-each":21}],28:[function(require,module,exports){
'use strict';
module.exports = require('./create/create-get-element-dimension')('Height');
},{"./create/create-get-element-dimension":22}],29:[function(require,module,exports){
'use strict';
module.exports = require('./create/create-get-element-dimension')('Width');
},{"./create/create-get-element-dimension":22}],30:[function(require,module,exports){
'use strict';
var ERR = require('./constants').ERR;
var toString = Object.prototype.toString;
module.exports = Object.getPrototypeOf || function getPrototypeOf(obj) {
    var prototype;
    if (obj == null) {
        throw TypeError(ERR.UNDEFINED_OR_NULL);
    }
    prototype = obj.__proto__;
    if (typeof prototype !== 'undefined') {
        return prototype;
    }
    if (toString.call(obj.constructor) === '[object Function]') {
        return obj.constructor.prototype;
    }
    return obj;
};
},{"./constants":19}],31:[function(require,module,exports){
'use strict';
var isObjectLike = require('./is-object-like'), isLength = require('./is-length'), isWindowLike = require('./is-window-like');
module.exports = function isArrayLikeObject(value) {
    return isObjectLike(value) && isLength(value.length) && !isWindowLike(value);
};
},{"./is-length":35,"./is-object-like":36,"./is-window-like":41}],32:[function(require,module,exports){
'use strict';
var isLength = require('./is-length'), isWindowLike = require('./is-window-like');
module.exports = function isArrayLike(value) {
    if (value == null) {
        return false;
    }
    if (typeof value === 'object') {
        return isLength(value.length) && !isWindowLike(value);
    }
    return typeof value === 'string';
};
},{"./is-length":35,"./is-window-like":41}],33:[function(require,module,exports){
'use strict';
var isObjectLike = require('./is-object-like'), isLength = require('./is-length');
var toString = {}.toString;
module.exports = Array.isArray || function isArray(value) {
    return isObjectLike(value) && isLength(value.length) && toString.call(value) === '[object Array]';
};
},{"./is-length":35,"./is-object-like":36}],34:[function(require,module,exports){
'use strict';
var _type = require('./_type');
var rDeepKey = /(^|[^\\])(\\\\)*(\.|\[)/;
function isKey(val) {
    var type;
    if (!val) {
        return true;
    }
    if (_type(val) === 'array') {
        return false;
    }
    type = typeof val;
    if (type === 'number' || type === 'boolean' || _type(val) === 'symbol') {
        return true;
    }
    return !rDeepKey.test(val);
}
module.exports = isKey;
},{"./_type":3}],35:[function(require,module,exports){
'use strict';
var MAX_ARRAY_LENGTH = require('./constants').MAX_ARRAY_LENGTH;
module.exports = function isLength(value) {
    return typeof value === 'number' && value >= 0 && value <= MAX_ARRAY_LENGTH && value % 1 === 0;
};
},{"./constants":19}],36:[function(require,module,exports){
'use strict';
module.exports = function isObjectLike(value) {
    return !!value && typeof value === 'object';
};
},{}],37:[function(require,module,exports){
'use strict';
var isObjectLike = require('./is-object-like');
var toString = {}.toString;
module.exports = function isObject(value) {
    return isObjectLike(value) && toString.call(value) === '[object Object]';
};
},{"./is-object-like":36}],38:[function(require,module,exports){
'use strict';
var getPrototypeOf = require('./get-prototype-of');
var isObject = require('./is-object');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var toString = Function.prototype.toString;
var OBJECT = toString.call(Object);
module.exports = function isPlainObject(v) {
    var p, c;
    if (!isObject(v)) {
        return false;
    }
    p = getPrototypeOf(v);
    if (p === null) {
        return true;
    }
    if (!hasOwnProperty.call(p, 'constructor')) {
        return false;
    }
    c = p.constructor;
    return typeof c === 'function' && toString.call(c) === OBJECT;
};
},{"./get-prototype-of":30,"./is-object":37}],39:[function(require,module,exports){
'use strict';
module.exports = function isPrimitive(value) {
    return !value || typeof value !== 'object' && typeof value !== 'function';
};
},{}],40:[function(require,module,exports){
'use strict';
var type = require('./type');
module.exports = function isSymbol(value) {
    return type(value) === 'symbol';
};
},{"./type":58}],41:[function(require,module,exports){
'use strict';
var isObjectLike = require('./is-object-like');
module.exports = function isWindowLike(value) {
    return isObjectLike(value) && value.window === value;
};
},{"./is-object-like":36}],42:[function(require,module,exports){
'use strict';
module.exports = function isset(key, obj) {
    if (obj == null) {
        return false;
    }
    return typeof obj[key] !== 'undefined' || key in obj;
};
},{}],43:[function(require,module,exports){
'use strict';
var isArrayLikeObject = require('./is-array-like-object'), matchesProperty = require('./matches-property'), property = require('./property');
exports.iteratee = function iteratee(value) {
    if (typeof value === 'function') {
        return value;
    }
    if (isArrayLikeObject(value)) {
        return matchesProperty(value);
    }
    return property(value);
};
},{"./is-array-like-object":31,"./matches-property":45,"./property":50}],44:[function(require,module,exports){
'use strict';
var baseKeys = require('./base/base-keys');
var toObject = require('./to-object');
var support = require('./support/support-keys');
if (support !== 'es2015') {
    module.exports = function keys(v) {
        var _keys;
        if (support === 'es5') {
            _keys = Object.keys;
        } else {
            _keys = baseKeys;
        }
        return _keys(toObject(v));
    };
} else {
    module.exports = Object.keys;
}
},{"./base/base-keys":11,"./support/support-keys":53,"./to-object":57}],45:[function(require,module,exports){
'use strict';
var castPath = require('./cast-path'), get = require('./base/base-get'), ERR = require('./constants').ERR;
module.exports = function matchesProperty(property) {
    var path = castPath(property[0]), value = property[1];
    if (!path.length) {
        throw Error(ERR.NO_PATH);
    }
    return function (object) {
        if (object == null) {
            return false;
        }
        if (path.length > 1) {
            return get(object, path, 0) === value;
        }
        return object[path[0]] === value;
    };
};
},{"./base/base-get":9,"./cast-path":16,"./constants":19}],46:[function(require,module,exports){
'use strict';
var isPlainObject = require('./is-plain-object');
var toObject = require('./to-object');
var isArray = require('./is-array');
var keys = require('./keys');
module.exports = function mixin(deep, object) {
    var l = arguments.length;
    var i = 2;
    var names, exp, j, k, val, key, nowArray, src;
    if (typeof deep !== 'boolean') {
        object = deep;
        deep = true;
        i = 1;
    }
    if (i === l) {
        object = this;
        --i;
    }
    object = toObject(object);
    for (; i < l; ++i) {
        names = keys(exp = toObject(arguments[i]));
        for (j = 0, k = names.length; j < k; ++j) {
            val = exp[key = names[j]];
            if (deep && val !== exp && (isPlainObject(val) || (nowArray = isArray(val)))) {
                src = object[key];
                if (nowArray) {
                    if (!isArray(src)) {
                        src = [];
                    }
                    nowArray = false;
                } else if (!isPlainObject(src)) {
                    src = {};
                }
                object[key] = mixin(true, src, val);
            } else {
                object[key] = val;
            }
        }
    }
    return object;
};
},{"./is-array":33,"./is-plain-object":38,"./keys":44,"./to-object":57}],47:[function(require,module,exports){
'use strict';
module.exports = function noop() {
};
},{}],48:[function(require,module,exports){
'use strict';
module.exports = Date.now || function now() {
    return new Date().getTime();
};
},{}],49:[function(require,module,exports){
'use strict';
var before = require('./before');
module.exports = function once(target) {
    return before(1, target);
};
},{"./before":14}],50:[function(require,module,exports){
'use strict';
module.exports = require('./create/create-property')(require('./base/base-property'));
},{"./base/base-property":12,"./create/create-property":23}],51:[function(require,module,exports){
'use strict';
var isPrimitive = require('./is-primitive'), ERR = require('./constants').ERR;
module.exports = Object.setPrototypeOf || function setPrototypeOf(target, prototype) {
    if (target == null) {
        throw TypeError(ERR.UNDEFINED_OR_NULL);
    }
    if (prototype !== null && isPrimitive(prototype)) {
        throw TypeError('Object prototype may only be an Object or null: ' + prototype);
    }
    if ('__proto__' in target) {
        target.__proto__ = prototype;
    }
    return target;
};
},{"./constants":19,"./is-primitive":39}],52:[function(require,module,exports){
'use strict';
var support;
function test(target) {
    try {
        if ('' in Object.defineProperty(target, '', {})) {
            return true;
        }
    } catch (e) {
    }
    return false;
}
if (test({})) {
    support = 'full';
} else if (typeof document !== 'undefined' && test(document.createElement('span'))) {
    support = 'dom';
} else {
    support = 'not-supported';
}
module.exports = support;
},{}],53:[function(require,module,exports){
'use strict';
var support;
if (Object.keys) {
    try {
        support = Object.keys(''), 'es2015';
    } catch (e) {
        support = 'es5';
    }
} else if ({ toString: null }.propertyIsEnumerable('toString')) {
    support = 'not-supported';
} else {
    support = 'has-a-bug';
}
module.exports = support;
},{}],54:[function(require,module,exports){
'use strict';
var timestamp = require('./timestamp');
var requestAF, cancelAF;
if (typeof window !== 'undefined') {
    cancelAF = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame;
    requestAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
}
var noRequestAnimationFrame = !requestAF || !cancelAF || typeof navigator !== 'undefined' && /iP(ad|hone|od).*OS\s6/.test(navigator.userAgent);
if (noRequestAnimationFrame) {
    var lastRequestTime = 0, frameDuration = 1000 / 60;
    exports.request = function request(animate) {
        var now = timestamp(), nextRequestTime = Math.max(lastRequestTime + frameDuration, now);
        return setTimeout(function () {
            lastRequestTime = nextRequestTime;
            animate(now);
        }, nextRequestTime - now);
    };
    exports.cancel = clearTimeout;
} else {
    exports.request = function request(animate) {
        return requestAF(animate);
    };
    exports.cancel = function cancel(id) {
        return cancelAF(id);
    };
}
},{"./timestamp":55}],55:[function(require,module,exports){
'use strict';
var now = require('./now');
var navigatorStart;
if (typeof performance === 'undefined' || !performance.now) {
    navigatorStart = now();
    module.exports = function timestamp() {
        return now() - navigatorStart;
    };
} else {
    module.exports = function timestamp() {
        return performance.now();
    };
}
},{"./now":48}],56:[function(require,module,exports){
'use strict';
var _unescape = require('./_unescape'), isSymbol = require('./is-symbol');
module.exports = function toKey(val) {
    var key;
    if (typeof val === 'string') {
        return _unescape(val);
    }
    if (isSymbol(val)) {
        return val;
    }
    key = '' + val;
    if (key === '0' && 1 / val === -Infinity) {
        return '-0';
    }
    return _unescape(key);
};
},{"./_unescape":4,"./is-symbol":40}],57:[function(require,module,exports){
'use strict';
var ERR = require('./constants').ERR;
module.exports = function toObject(value) {
    if (value == null) {
        throw TypeError(ERR.UNDEFINED_OR_NULL);
    }
    return Object(value);
};
},{"./constants":19}],58:[function(require,module,exports){
'use strict';
var create = require('./create');
var toString = {}.toString, types = create(null);
module.exports = function getType(value) {
    var type, tag;
    if (value === null) {
        return 'null';
    }
    type = typeof value;
    if (type !== 'object' && type !== 'function') {
        return type;
    }
    type = types[tag = toString.call(value)];
    if (type) {
        return type;
    }
    return types[tag] = tag.slice(8, -1).toLowerCase();
};
},{"./create":20}],59:[function(require,module,exports){
'use strict';

var toString = Object.prototype.toString;

/**
 * @method module:utils.ArgumentException
 * @param  {string}    method
 * @param  {string}    argument
 * @param  {any}       value
 * @return {TypeError}
 */
function ArgumentException ( method, argument, value )
{
  return TypeError( '`' + method + '` got unexpected `' + argument + '` argument (' + typeof value + ', ' + toString.call( value ) + ') with value: ' + value );
}

module.exports = ArgumentException;

},{}],60:[function(require,module,exports){
'use strict';

/**
 * @method module:utils.LogicalError
 * @param  {string} method
 * @param  {string} message
 * @return {Error}
 */
function LogicalError ( method, message )
{
  return Error( '`' + method + '` ' + message );
}

module.exports = LogicalError;

},{}],61:[function(require,module,exports){
'use strict';
var isObjectLike = require('peako/is-object-like');
var getElementW = require('peako/get-element-w');
var getElementH = require('peako/get-element-h');
var baseForIn = require('peako/base/base-for-in');
var _setDefaultDrawingSettings = require('./internal/_set-default-drawing-settings');
var _copyDrawingSettings = require('./internal/_copy-drawing-settings');
var _getGLContextName = require('./internal/_get-gl-context-name');
var _createPolygon = require('./internal/_create-polygon');
var _polygons = require('./internal/_polygons');
var constants = require('./constants');
var options = require('./options');
var rendererIndex = 0;
function Renderer(options, mode) {
    var getContextOptions = { alpha: options.alpha };
    if (options.canvas) {
        this.canvas = options.canvas;
    } else {
        this.canvas = document.createElement('canvas');
        this.canvas.innerHTML = 'Unable to run the application.';
    }
    if (options.append) {
        this.add();
    }
    if (mode === constants.MODE_2D) {
        this.context = this.canvas.getContext('2d', getContextOptions);
    } else if (mode === constants.MODE_GL) {
        if (mode = _getGLContextName()) {
            this.context = this.canvas.getContext(mode, getContextOptions);
        } else {
            throw Error('Cannot get WebGL context. Try to use v6.constants.MODE_GL as the renderer mode or v6.Renderer2D instead of v6.RendererGL');
        }
    }
    this.settings = options.settings;
    this.mode = mode;
    this.index = rendererIndex;
    this._stack = [];
    this._stackIndex = -1;
    this._vertices = [];
    _setDefaultDrawingSettings(this, this);
    if ('w' in options || 'h' in options) {
        this.resize(options.w, options.h);
    } else {
        this.resizeTo(window);
    }
    rendererIndex += 1;
}
Renderer.prototype = {
    add: function add(parent) {
        (parent || document.body).appendChild(this.canvas);
        return this;
    },
    destroy: function destroy() {
        this.canvas.parentNode.removeChild(this.canvas);
        return this;
    },
    push: function push() {
        if (this._stack[++this._stackIndex]) {
            _copyDrawingSettings(this._stack[this._stackIndex], this);
        } else {
            this._stack.push(_setDefaultDrawingSettings({}, this));
        }
        return this;
    },
    pop: function pop() {
        if (this._stackIndex >= 0) {
            _copyDrawingSettings(this, this._stack[this._stackIndex--]);
        } else {
            _setDefaultDrawingSettings(this, this);
        }
        return this;
    },
    resize: function resize(w, h) {
        var canvas = this.canvas;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        var scale = this.settings.scale;
        canvas.width = this.w = Math.floor(w * scale);
        canvas.height = this.h = Math.floor(h * scale);
        return this;
    },
    resizeTo: function resizeTo(element) {
        return this.resize(getElementW(element), getElementH(element));
    },
    rescale: function rescale() {
        return this.resizeTo(this.canvas);
    },
    background: function background(r, g, b, a) {
        if (isObjectLike(r)) {
            return this.backgroundImage(r);
        }
        return this.backgroundColor(r, g, b, a);
    },
    _polygon: function _polygon(x, y, rx, ry, n, a, degrees) {
        var polygon = _polygons[n];
        var matrix = this.matrix;
        if (!polygon) {
            polygon = _polygons[n] = _createPolygon(n);
        }
        if (degrees) {
            a *= Math.PI / 180;
        }
        matrix.save();
        matrix.translate(x, y);
        matrix.rotate(a);
        this.vertices(polygon, polygon.length * 0.5, null, rx, ry);
        matrix.restore();
        return this;
    },
    polygon: function polygon(x, y, r, n, a) {
        if (n % 1) {
            n = Math.floor(n * 100) * 0.01;
        }
        if (typeof a !== 'undefined') {
            this._polygon(x, y, r, r, n, a, options.degrees);
        } else {
            this._polygon(x, y, r, r, n, -Math.PI * 0.5);
        }
        return this;
    },
    noStroke: function noStroke() {
        this._doStroke = false;
        return this;
    },
    noFill: function noFill() {
        this._doFill = false;
        return this;
    },
    setTransformFromCamera: function setTransformFromCamera(camera) {
        var position = camera.position;
        var zoom = camera.zoom;
        this.matrix.setTransform(zoom, 0, 0, zoom, position[0] * zoom, position[1] * zoom);
        return this;
    },
    lineWidth: function lineWidth(number) {
        this._lineW = number;
        return this;
    },
    constructor: Renderer
};
baseForIn({
    stroke: 'Stroke',
    fill: 'Fill'
}, function (Name, name) {
    var _nameColor = '_' + name + 'Color', _doName = '_do' + Name, _name = '_' + name;
    Renderer.prototype[name] = function (r, g, b, a) {
        if (typeof r === 'undefined') {
            this[_name]();
        } else if (typeof r !== 'boolean') {
            if (typeof r === 'string' || this[_nameColor].type !== this.settings.color.prototype.type) {
                this[_nameColor] = new this.settings.color(r, g, b, a);
            } else {
                this[_nameColor].set(r, g, b, a);
            }
            this[_doName] = true;
        } else {
            this[_doName] = r;
        }
        return this;
    };
}, void 0, true, [
    'stroke',
    'fill'
]);
[
    'setTransform',
    'transform',
    'translate',
    'restore',
    'scale',
    'save'
].forEach(function (name) {
    Renderer.prototype[name] = Function('a, b, c, d, e, f', 'return this.matrix.' + name + '( a, b, c, d, e, f ), this;');
});
module.exports = Renderer;
},{"./constants":68,"./internal/_copy-drawing-settings":69,"./internal/_create-polygon":70,"./internal/_get-gl-context-name":71,"./internal/_polygons":72,"./internal/_set-default-drawing-settings":73,"./options":76,"peako/base/base-for-in":8,"peako/get-element-h":28,"peako/get-element-w":29,"peako/is-object-like":36}],62:[function(require,module,exports){
'use strict';
var defaults = require('peako/defaults');
var constants = require('./constants');
var Renderer = require('./Renderer');
var _options = require('./options');
var align = require('./internal/align');
function Renderer2D(options) {
    options = defaults(_options, options);
    Renderer.call(this, options, constants.MODE_2D);
    this.smooth(this.settings.smooth);
    this.matrix = this.context;
    this._beginPath = false;
}
Renderer2D.prototype = Object.create(Renderer.prototype);
Renderer2D.prototype.smooth = function () {
    var names = [
            'webkitImageSmoothingEnabled',
            'mozImageSmoothingEnabled',
            'msImageSmoothingEnabled',
            'oImageSmoothingEnabled',
            'imageSmoothingEnabled'
        ];
    return function smooth(bool) {
        var i;
        if (typeof bool !== 'boolean') {
            throw TypeError('First argument in smooth( bool ) must be a boolean');
        }
        for (i = names.length - 1; i >= 0; --i) {
            if (names[i] in this.context) {
                this.context[names[i]] = bool;
            }
        }
        this.settings.smooth = bool;
        return this;
    };
}();
Renderer2D.prototype.backgroundColor = function backgroundColor(r, g, b, a) {
    var context = this.context;
    context.save();
    context.setTransform(this.settings.scale, 0, 0, this.settings.scale, 0, 0);
    context.fillStyle = new this.settings.color(r, g, b, a);
    context.fillRect(0, 0, this.w, this.h);
    context.restore();
    return this;
};
Renderer2D.prototype.backgroundImage = function backgroundImage(image) {
    var _rectAlignX = this._rectAlignX, _rectAlignY = this._rectAlignY;
    this._rectAlignX = constants.CENTER;
    this._rectAlignY = constants.MIDDLE;
    this.image(image, this.w * 0.5, this.h * 0.5);
    this._rectAlignX = _rectAlignX;
    this._rectAlignY = _rectAlignY;
    return this;
};
Renderer2D.prototype.image = function image(image, x, y, w, h) {
    if (image.get().loaded) {
        if (typeof w === 'undefined') {
            w = image.dw;
        }
        if (typeof h === 'undefined') {
            h = image.dh;
        }
        x = Math.floor(align(x, w, this._rectAlignX));
        y = Math.floor(align(y, h, this._rectAlignY));
        this.context.drawImage(image.get().image, image.x, image.y, image.w, image.h, x, y, w, h);
    }
    return this;
};
Renderer2D.prototype.clear = function clear(x, y, w, h) {
    if (typeof x === 'undefined') {
        x = y = 0;
        w = this.w;
        h = this.h;
    } else {
        x = Math.floor(align(x, w, this._rectAlignX));
        y = Math.floor(align(y, h, this._rectAlignY));
    }
    this.context.clearRect(x, y, w, h);
    return this;
};
Renderer2D.prototype.rect = function rect(x, y, w, h) {
    x = Math.floor(align(x, w, this._rectAlignX));
    y = Math.floor(align(y, h, this._rectAlignY));
    if (this._beginPath) {
        this.context.rect(x, y, w, h);
    } else {
        this.context.beginPath();
        this.context.rect(x, y, w, h);
        if (this._doFill) {
            this._fill();
        }
        if (this._doStroke) {
            this._stroke();
        }
    }
    return this;
};
Renderer2D.prototype.arc = function arc(x, y, r) {
    if (this._beginPath) {
        this.context.arc(x, y, r, 0, Math.PI * 2, false);
    } else {
        this.context.beginPath();
        this.context.arc(x, y, r, 0, Math.PI * 2, false);
        if (this._doFill) {
            this._fill();
        }
        if (this._doStroke) {
            this._stroke(true);
        }
    }
    return this;
};
Renderer2D.prototype.vertices = function vertices(verts, count, _mode, _sx, _sy) {
    var context = this.context, i;
    if (count < 2) {
        return this;
    }
    if (_sx == null) {
        _sx = _sy = 1;
    }
    context.beginPath();
    context.moveTo(verts[0] * _sx, verts[1] * _sy);
    for (i = 2, count *= 2; i < count; i += 2) {
        context.lineTo(verts[i] * _sx, verts[i + 1] * _sy);
    }
    if (this._doFill) {
        this._fill();
    }
    if (this._doStroke && this._lineW > 0) {
        this._stroke(true);
    }
    return this;
};
Renderer2D.prototype._fill = function _fill() {
    this.context.fillStyle = this._fillColor;
    this.context.fill();
};
Renderer2D.prototype._stroke = function (close) {
    var context = this.context;
    if (close) {
        context.closePath();
    }
    context.strokeStyle = this._strokeColor;
    if ((context.lineWidth = this._lineW) <= 1) {
        context.stroke();
    }
    context.stroke();
};
Renderer2D.prototype.constructor = Renderer2D;
module.exports = Renderer2D;
},{"./Renderer":61,"./constants":68,"./internal/align":74,"./options":76,"peako/defaults":25}],63:[function(require,module,exports){
'use strict';
var LightEmitter = require('light_emitter');
var extend = require('extend');
var timestamp = require('peako/timestamp');
var timer = require('peako/timer');
var Ticker = extend(LightEmitter, {
        constructor: function Ticker() {
            var self = this;
            this.__super__.call(this);
            this.lastRequestAnimationFrameID = 0;
            this.lastRequestTime = 0;
            this.skippedTime = 0;
            this.totalTime = 0;
            this.running = false;
            function tick(now) {
                var elapsedTime;
                if (!self.running) {
                    if (!now) {
                        self.lastRequestAnimationFrameID = timer.request(tick);
                        self.lastRequestTime = timestamp();
                        self.running = true;
                    }
                    return this;
                }
                if (!now) {
                    now = timestamp();
                }
                elapsedTime = Math.min(1, (now - self.lastRequestTime) * 0.001);
                self.skippedTime += elapsedTime;
                self.totalTime += elapsedTime;
                while (self.skippedTime >= self.step && self.running) {
                    self.skippedTime -= self.step;
                    self.emit('update', self.step, now);
                }
                self.emit('render', elapsedTime, now);
                self.lastRequestTime = now;
                self.lastRequestAnimationFrameID = timer.request(tick);
                return this;
            }
            this.tick = tick;
            this.setFPS(60);
        },
        setFPS: function setFPS(fps) {
            this.step = 1 / fps;
            return this;
        },
        clear: function clear() {
            this.skippedTime = 0;
            return this;
        },
        stop: function stop() {
            this.running = false;
            return this;
        }
    });
module.exports = Ticker;
},{"extend":75,"light_emitter":1,"peako/timer":54,"peako/timestamp":55}],64:[function(require,module,exports){
'use strict';
module.exports = HSLA;
var clamp = require('peako/clamp');
var RGBA = require('./RGBA');
var parse = require('./internal/parse');
function HSLA(h, s, l, a) {
    this.set(h, s, l, a);
}
HSLA.prototype = {
    perceivedBrightness: function perceivedBrightness() {
        return this.rgba().perceivedBrightness();
    },
    luminance: function luminance() {
        return this.rgba().luminance();
    },
    brightness: function brightness() {
        return this.rgba().brightness();
    },
    toString: function toString() {
        return 'hsla(' + this[0] + ', ' + this[1] + '%, ' + this[2] + '%, ' + this[3] + ')';
    },
    set: function set(h, s, l, a) {
        switch (true) {
        case typeof h === 'string':
            h = parse(h);
        case typeof h === 'object' && h != null:
            if (h.type !== this.type) {
                h = h[this.type]();
            }
            this[0] = h[0];
            this[1] = h[1];
            this[2] = h[2];
            this[3] = h[3];
            break;
        default:
            switch (void 0) {
            case h:
                a = 1;
                l = s = h = 0;
                break;
            case s:
                a = 1;
                l = Math.floor(h);
                s = h = 0;
                break;
            case l:
                a = s;
                l = Math.floor(h);
                s = h = 0;
                break;
            case a:
                a = 1;
            default:
                h = Math.floor(h);
                s = Math.floor(s);
                l = Math.floor(l);
            }
            this[0] = h;
            this[1] = s;
            this[2] = l;
            this[3] = a;
        }
        return this;
    },
    rgba: function rgba() {
        var rgba = new RGBA();
        var h = this[0] % 360 / 360, s = this[1] * 0.01, l = this[2] * 0.01;
        var tr = h + 1 / 3, tg = h, tb = h - 1 / 3;
        var q;
        if (l < 0.5) {
            q = l * (1 + s);
        } else {
            q = l + s - l * s;
        }
        var p = 2 * l - q;
        if (tr < 0) {
            ++tr;
        }
        if (tg < 0) {
            ++tg;
        }
        if (tb < 0) {
            ++tb;
        }
        if (tr > 1) {
            --tr;
        }
        if (tg > 1) {
            --tg;
        }
        if (tb > 1) {
            --tb;
        }
        rgba[0] = foo(tr, p, q);
        rgba[1] = foo(tg, p, q);
        rgba[2] = foo(tb, p, q);
        rgba[3] = this[3];
        return rgba;
    },
    lerp: function lerp(h, s, l, value) {
        var color = new HSLA();
        color[0] = h;
        color[1] = s;
        color[2] = l;
        return this.lerpColor(color, value);
    },
    lerpColor: function lerpColor(color, value) {
        return this.rgba().lerpColor(color, value).hsla();
    },
    shade: function shade(value) {
        var hsla = new HSLA();
        hsla[0] = this[0];
        hsla[1] = this[1];
        hsla[2] = clamp(this[2] + value, 0, 100);
        hsla[3] = this[3];
        return hsla;
    },
    constructor: HSLA,
    type: 'hsla'
};
function foo(t, p, q) {
    if (t < 1 / 6) {
        return Math.round((p + (q - p) * 6 * t) * 255);
    }
    if (t < 0.5) {
        return Math.round(q * 255);
    }
    if (t < 2 / 3) {
        return Math.round((p + (q - p) * (2 / 3 - t) * 6) * 255);
    }
    return Math.round(p * 255);
}
},{"./RGBA":65,"./internal/parse":67,"peako/clamp":17}],65:[function(require,module,exports){
'use strict';
module.exports = RGBA;
var HSLA = require('./HSLA');
var parse = require('./internal/parse');
function RGBA(r, g, b, a) {
    this.set(r, g, b, a);
}
RGBA.prototype = {
    perceivedBrightness: function perceivedBrightness() {
        var r = this[0], g = this[1], b = this[2];
        return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
    },
    luminance: function luminance() {
        return this[0] * 0.2126 + this[1] * 0.7152 + this[2] * 0.0722;
    },
    brightness: function brightness() {
        return 0.299 * this[0] + 0.587 * this[1] + 0.114 * this[2];
    },
    toString: function toString() {
        return 'rgba(' + this[0] + ', ' + this[1] + ', ' + this[2] + ', ' + this[3] + ')';
    },
    set: function set(r, g, b, a) {
        switch (true) {
        case typeof r === 'string':
            r = parse(r);
        case typeof r === 'object' && r != null:
            if (r.type !== this.type) {
                r = r[this.type]();
            }
            this[0] = r[0];
            this[1] = r[1];
            this[2] = r[2];
            this[3] = r[3];
            break;
        default:
            switch (void 0) {
            case r:
                a = 1;
                b = g = r = 0;
                break;
            case g:
                a = 1;
                b = g = r = Math.floor(r);
                break;
            case b:
                a = g;
                b = g = r = Math.floor(r);
                break;
            case a:
                a = 1;
            default:
                r = Math.floor(r);
                g = Math.floor(g);
                b = Math.floor(b);
            }
            this[0] = r;
            this[1] = g;
            this[2] = b;
            this[3] = a;
        }
        return this;
    },
    hsla: function hsla() {
        var hsla = new HSLA();
        var r = this[0] / 255, g = this[1] / 255, b = this[2] / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var l = (max + min) * 50, h, s;
        var diff = max - min;
        if (diff) {
            if (l > 50) {
                s = diff / (2 - max - min);
            } else {
                s = diff / (max + min);
            }
            switch (max) {
            case r:
                if (g < b) {
                    h = 1.0472 * (g - b) / diff + 6.2832;
                } else {
                    h = 1.0472 * (g - b) / diff;
                }
                break;
            case g:
                h = 1.0472 * (b - r) / diff + 2.0944;
                break;
            default:
                h = 1.0472 * (r - g) / diff + 4.1888;
            }
            h = Math.round(h * 360 / 6.2832);
            s = Math.round(s * 100);
        } else {
            h = s = 0;
        }
        hsla[0] = h;
        hsla[1] = s;
        hsla[2] = Math.round(l);
        hsla[3] = this[3];
        return hsla;
    },
    rgba: function rgba() {
        return this;
    },
    lerp: function lerp(r, g, b, value) {
        r = lerp(this[0], r, value);
        g = lerp(this[0], g, value);
        b = lerp(this[0], b, value);
        return new RGBA(r, g, b, this[3]);
    },
    lerpColor: function lerpColor(color, value) {
        var r, g, b;
        if (typeof color !== 'object') {
            color = parse(color);
        }
        if (color.type !== 'rgba') {
            color = color.rgba();
        }
        r = color[0];
        g = color[1];
        b = color[2];
        return this.lerp(r, g, b, value);
    },
    shade: function shade(value) {
        return this.hsla().shade(value).rgba();
    },
    constructor: RGBA,
    type: 'rgba'
};
},{"./HSLA":64,"./internal/parse":67}],66:[function(require,module,exports){
'use strict';
module.exports = {
    aliceblue: 'f0f8ffff',
    antiquewhite: 'faebd7ff',
    aqua: '00ffffff',
    aquamarine: '7fffd4ff',
    azure: 'f0ffffff',
    beige: 'f5f5dcff',
    bisque: 'ffe4c4ff',
    black: '000000ff',
    blanchedalmond: 'ffebcdff',
    blue: '0000ffff',
    blueviolet: '8a2be2ff',
    brown: 'a52a2aff',
    burlywood: 'deb887ff',
    cadetblue: '5f9ea0ff',
    chartreuse: '7fff00ff',
    chocolate: 'd2691eff',
    coral: 'ff7f50ff',
    cornflowerblue: '6495edff',
    cornsilk: 'fff8dcff',
    crimson: 'dc143cff',
    cyan: '00ffffff',
    darkblue: '00008bff',
    darkcyan: '008b8bff',
    darkgoldenrod: 'b8860bff',
    darkgray: 'a9a9a9ff',
    darkgreen: '006400ff',
    darkkhaki: 'bdb76bff',
    darkmagenta: '8b008bff',
    darkolivegreen: '556b2fff',
    darkorange: 'ff8c00ff',
    darkorchid: '9932ccff',
    darkred: '8b0000ff',
    darksalmon: 'e9967aff',
    darkseagreen: '8fbc8fff',
    darkslateblue: '483d8bff',
    darkslategray: '2f4f4fff',
    darkturquoise: '00ced1ff',
    darkviolet: '9400d3ff',
    deeppink: 'ff1493ff',
    deepskyblue: '00bfffff',
    dimgray: '696969ff',
    dodgerblue: '1e90ffff',
    feldspar: 'd19275ff',
    firebrick: 'b22222ff',
    floralwhite: 'fffaf0ff',
    forestgreen: '228b22ff',
    fuchsia: 'ff00ffff',
    gainsboro: 'dcdcdcff',
    ghostwhite: 'f8f8ffff',
    gold: 'ffd700ff',
    goldenrod: 'daa520ff',
    gray: '808080ff',
    green: '008000ff',
    greenyellow: 'adff2fff',
    honeydew: 'f0fff0ff',
    hotpink: 'ff69b4ff',
    indianred: 'cd5c5cff',
    indigo: '4b0082ff',
    ivory: 'fffff0ff',
    khaki: 'f0e68cff',
    lavender: 'e6e6faff',
    lavenderblush: 'fff0f5ff',
    lawngreen: '7cfc00ff',
    lemonchiffon: 'fffacdff',
    lightblue: 'add8e6ff',
    lightcoral: 'f08080ff',
    lightcyan: 'e0ffffff',
    lightgoldenrodyellow: 'fafad2ff',
    lightgrey: 'd3d3d3ff',
    lightgreen: '90ee90ff',
    lightpink: 'ffb6c1ff',
    lightsalmon: 'ffa07aff',
    lightseagreen: '20b2aaff',
    lightskyblue: '87cefaff',
    lightslateblue: '8470ffff',
    lightslategray: '778899ff',
    lightsteelblue: 'b0c4deff',
    lightyellow: 'ffffe0ff',
    lime: '00ff00ff',
    limegreen: '32cd32ff',
    linen: 'faf0e6ff',
    magenta: 'ff00ffff',
    maroon: '800000ff',
    mediumaquamarine: '66cdaaff',
    mediumblue: '0000cdff',
    mediumorchid: 'ba55d3ff',
    mediumpurple: '9370d8ff',
    mediumseagreen: '3cb371ff',
    mediumslateblue: '7b68eeff',
    mediumspringgreen: '00fa9aff',
    mediumturquoise: '48d1ccff',
    mediumvioletred: 'c71585ff',
    midnightblue: '191970ff',
    mintcream: 'f5fffaff',
    mistyrose: 'ffe4e1ff',
    moccasin: 'ffe4b5ff',
    navajowhite: 'ffdeadff',
    navy: '000080ff',
    oldlace: 'fdf5e6ff',
    olive: '808000ff',
    olivedrab: '6b8e23ff',
    orange: 'ffa500ff',
    orangered: 'ff4500ff',
    orchid: 'da70d6ff',
    palegoldenrod: 'eee8aaff',
    palegreen: '98fb98ff',
    paleturquoise: 'afeeeeff',
    palevioletred: 'd87093ff',
    papayawhip: 'ffefd5ff',
    peachpuff: 'ffdab9ff',
    peru: 'cd853fff',
    pink: 'ffc0cbff',
    plum: 'dda0ddff',
    powderblue: 'b0e0e6ff',
    purple: '800080ff',
    red: 'ff0000ff',
    rosybrown: 'bc8f8fff',
    royalblue: '4169e1ff',
    saddlebrown: '8b4513ff',
    salmon: 'fa8072ff',
    sandybrown: 'f4a460ff',
    seagreen: '2e8b57ff',
    seashell: 'fff5eeff',
    sienna: 'a0522dff',
    silver: 'c0c0c0ff',
    skyblue: '87ceebff',
    slateblue: '6a5acdff',
    slategray: '708090ff',
    snow: 'fffafaff',
    springgreen: '00ff7fff',
    steelblue: '4682b4ff',
    tan: 'd2b48cff',
    teal: '008080ff',
    thistle: 'd8bfd8ff',
    tomato: 'ff6347ff',
    turquoise: '40e0d0ff',
    violet: 'ee82eeff',
    violetred: 'd02090ff',
    wheat: 'f5deb3ff',
    white: 'ffffffff',
    whitesmoke: 'f5f5f5ff',
    yellow: 'ffff00ff',
    yellowgreen: '9acd32ff',
    transparent: '00000000'
};
},{}],67:[function(require,module,exports){
'use strict';
module.exports = parse;
var RGBA = require('../RGBA');
var HSLA = require('../HSLA');
var colors = require('./colors');
var parsed = Object.create(null);
var TRANSPARENT = [
        0,
        0,
        0,
        0
    ];
var regexps = {
        hex3: /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/,
        hex: /^#([0-9a-f]{6})([0-9a-f]{2})?$/,
        rgb: /^rgb\s*\(\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\s*\)$|^\s*rgba\s*\(\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\s*\)$/,
        hsl: /^hsl\s*\(\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\u0025\s*,\s*(\d+|\d*\.\d+)\u0025\s*\)$|^\s*hsla\s*\(\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\u0025\s*,\s*(\d+|\d*\.\d+)\u0025\s*,\s*(\d+|\d*\.\d+)\s*\)$/
    };
function parse(string) {
    var cache = parsed[string] || parsed[string = string.trim().toLowerCase()];
    if (!cache) {
        if (cache = colors[string]) {
            cache = new ColorData(parseHex(cache), RGBA);
        } else if (cache = regexps.hex.exec(string)) {
            cache = new ColorData(parseHex(formatHex(cache)), RGBA);
        } else if (cache = regexps.rgb.exec(string)) {
            cache = new ColorData(compactMatch(cache), RGBA);
        } else if (cache = regexps.hsl.exec(string)) {
            cache = new ColorData(compactMatch(cache), HSLA);
        } else if (cache = regexps.hex3.exec(string)) {
            cache = new ColorData(parseHex(formatHex(cache, true)), RGBA);
        } else {
            throw SyntaxError(string + ' is not a valid syntax');
        }
        parsed[string] = cache;
    }
    return new cache.color(cache[0], cache[1], cache[2], cache[3]);
}
function formatHex(match, shortSyntax) {
    var r, g, b, a;
    if (!shortSyntax) {
        return match[1] + (match[2] || 'ff');
    }
    r = match[1];
    g = match[2];
    b = match[3];
    a = match[4] || 'f';
    return r + r + g + g + b + b + a + a;
}
function parseHex(hex) {
    if (hex == 0) {
        return TRANSPARENT;
    }
    hex = parseInt(hex, 16);
    return [
        hex >> 24 & 255,
        hex >> 16 & 255,
        hex >> 8 & 255,
        (hex & 255) / 255
    ];
}
function compactMatch(match) {
    if (match[7]) {
        return [
            +match[4],
            +match[5],
            +match[6],
            +match[7]
        ];
    }
    return [
        +match[1],
        +match[2],
        +match[3]
    ];
}
function ColorData(match, color) {
    this[0] = match[0];
    this[1] = match[1];
    this[2] = match[2];
    this[3] = match[3];
    this.color = color;
}
},{"../HSLA":64,"../RGBA":65,"./colors":66}],68:[function(require,module,exports){
'use strict';
module.exports = {
    MODE_AUTO: 1,
    MODE_GL: 2,
    MODE_2D: 3,
    SELF_CONTEXT: 6,
    BOTTOM: 7,
    RIGHT: 8,
    LEFT: 9,
    TOP: 10,
    CENTER: 11,
    MIDDLE: 12
};
},{}],69:[function(require,module,exports){
'use strict';
function _copyDrawingSettings(target, source, deep) {
    if (deep) {
        target._fillColor[0] = source._fillColor[0];
        target._fillColor[1] = source._fillColor[1];
        target._fillColor[2] = source._fillColor[2];
        target._fillColor[3] = source._fillColor[3];
        target._font.style = source._font.style;
        target._font.variant = source._font.variant;
        target._font.weight = source._font.weight;
        target._font.size = source._font.size;
        target._font.family = source._font.family;
        target._strokeColor[0] = source._strokeColor[0];
        target._strokeColor[1] = source._strokeColor[1];
        target._strokeColor[2] = source._strokeColor[2];
        target._strokeColor[3] = source._strokeColor[3];
    }
    target._rectAlignX = source._rectAlignX;
    target._rectAlignY = source._rectAlignY;
    target._textAlignX = source._textAlignX;
    target._textAlignY = source._textAlignY;
    target._doStroke = source._doStroke;
    target._doFill = source._doFill;
    target._lineH = source._lineH;
    target._lineW = source._lineW;
    return target;
}
module.exports = _copyDrawingSettings;
},{}],70:[function(require,module,exports){
'use strict';
module.exports = function _createPolygon(n) {
    var i = Math.floor(n);
    var verts = new Float32Array(i * 2 + 2);
    var step = Math.PI * 2 / n;
    for (; i >= 0; --i) {
        verts[i * 2] = Math.cos(step * i);
        verts[1 + i * 2] = Math.sin(step * i);
    }
    return verts;
};
},{}],71:[function(require,module,exports){
'use strict';
var once = require('peako/once');
function _getGLContextName() {
    var canvas = document.createElement('canvas');
    var types, i;
    if (typeof canvas.getContext !== 'function') {
        return;
    }
    types = [
        'webkit-3d',
        'moz-webgl',
        'experimental-webgl',
        'webgl'
    ];
    for (i = types.length - 1; i >= 0; --i) {
        if (canvas.getContext(types[i])) {
            return types[i];
        }
    }
}
module.exports = once(_getGLContextName);
},{"peako/once":49}],72:[function(require,module,exports){
'use strict';
},{}],73:[function(require,module,exports){
'use strict';
var _copyDrawingSettings = require('./_copy-drawing-settings'), constants = require('../constants');
var defaultDrawingSettings = {
        _rectAlignX: constants.LEFT,
        _rectAlignY: constants.TOP,
        _textAlignX: constants.LEFT,
        _textAlineY: constants.TOP,
        _doStroke: true,
        _doFill: true,
        _lineH: 14,
        _lineW: 2
    };
module.exports = function _setDefaultDrawingSettings(target, source) {
    _copyDrawingSettings(target, defaultDrawingSettings);
    target._strokeColor = new source.settings.color();
    target._fillColor = new source.settings.color();
    target._font = null;
    return target;
};
},{"../constants":68,"./_copy-drawing-settings":69}],74:[function(require,module,exports){
'use strict';
var constants = require('../constants');
function align(value, width, align) {
    switch (align) {
    case constants.LEFT:
    case constants.TOP:
        return value;
    case constants.CENTER:
    case constants.MIDDLE:
        return value - width * 0.5;
    case constants.RIGHT:
    case constants.BOTTOM:
        return value - width;
    }
    return 0;
}
module.exports = align;
},{"../constants":68}],75:[function(require,module,exports){
'use strict';

var ArgumentException = require( 'utils/lib/ArgumentException' );
var LogicalError      = require( 'utils/lib/LogicalError' );
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @method extend
 * @param  {function} __super__
 * @param  {object}   __proto__
 * @param  {function} __proto__.constructor
 * @return {function}
 * @example
 * var extend = require( 'extend' );
 *
 * function Animal ( name ) {
 *   this.name = name;
 * }
 *
 * Animal.prototype.eat = function eat ( food ) {
 *   console.log( this.name, 'eats', food );
 * };
 *
 * var Cat = extend( Animal, {
 *   constructor: function Cat ( name ) {
 *     this.__super__.call( this, name );
 *   },
 *
 *   eat: function eat ( food ) {
 *     if ( food !== 'fish' ) {
 *       console.error( this.name, 'cannot eat', food );
 *     } else {
 *       this.__super__.prototype.eat.call( this, food );
 *     }
 *   }
 * } );
 *
 * var cat = new Cat( 'kitty' );
 * cat.eat( 'fish' ); // console.log:   'kitty eats fish'
 * cat.eat( 'dog' );  // console.error: 'kitty cannot eat dog'
 */
function extend ( __super__, __proto__ ) {
  var keys, i, l;

  if ( typeof __super__ !== 'function' ) {
    throw ArgumentException( 'extend(__super__: function, __proto__: object): function', '__super__', __super__ );
  }

  if ( ( typeof __proto__ !== 'object' || __proto__ === null ) && typeof __proto__ !== 'function' ) {
    throw ArgumentException( 'extend(__super__: function, __proto__: object): function', '__proto__', __proto__ );
  }

  if ( ! hasOwnProperty.call( __proto__, 'constructor' ) ) {
    throw LogicalError( 'extend(__super__: function, __proto__: object): function', 'cannot find `constructor` function in `__proto__`' );
  }

  if ( typeof __proto__.constructor !== 'function' ) {
    throw LogicalError( 'extend(__super__: function, __proto__: object): function', '`__proto__.constructor` is not a function' );
  }

  if ( typeof __super__.prototype !== 'object' ) {
    throw LogicalError( 'extend(__super__: function, __proto__: object): function', '`__super__.prototype` must be an object or null' );
  }

  __proto__.constructor.prototype = Object.create( __super__.prototype );
  __proto__.constructor.prototype.__super__ = __super__;

  for ( keys = Object.keys( __proto__ ), i = 0, l = keys.length; i < l; ++i ) {
    __proto__.constructor.prototype[ keys[ i ] ] = __proto__[ keys[ i ] ];
  }

  return __proto__.constructor;
}

module.exports = extend;

},{"utils/lib/ArgumentException":59,"utils/lib/LogicalError":60}],76:[function(require,module,exports){
'use strict';
module.exports = {
    settings: {
        color: require('./colors/RGBA'),
        smooth: false,
        scale: 1
    },
    antialias: true,
    blending: true,
    degrees: false,
    append: true,
    alpha: true,
    mode: require('./constants').MODE_2D
};
},{"./colors/RGBA":65,"./constants":68}],77:[function(require,module,exports){
'use strict';

var Renderer2D = require( 'v6.js/Renderer2D' );
var Ticker     = require( 'v6.js/Ticker' );

var renderer = new Renderer2D();
var ticker   = new Ticker();

ticker.on( 'render', function ()
{
  renderer.background( this.totalTime * 10 % 255 );
} );

ticker.tick();

},{"v6.js/Renderer2D":62,"v6.js/Ticker":63}]},{},[77]);
