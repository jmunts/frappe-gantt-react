webpackJsonpfrappe_gantt_react([0],[
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(2);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(8);
} else {
  module.exports = __webpack_require__(9);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 React v16.0.0
 react.production.min.js

 Copyright (c) 2013-present, Facebook, Inc.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/
var f=__webpack_require__(3),p=__webpack_require__(4);__webpack_require__(1);var r=__webpack_require__(2);
function t(a){for(var b=arguments.length-1,d="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,e=0;e<b;e++)d+="\x26args[]\x3d"+encodeURIComponent(arguments[e+1]);b=Error(d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var u={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function v(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}v.prototype.isReactComponent={};v.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?t("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};v.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function w(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}function x(){}x.prototype=v.prototype;var y=w.prototype=new x;y.constructor=w;f(y,v.prototype);y.isPureReactComponent=!0;function z(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}var A=z.prototype=new x;A.constructor=z;f(A,v.prototype);A.unstable_isAsyncReactComponent=!0;A.render=function(){return this.props.children};
var B={Component:v,PureComponent:w,AsyncComponent:z},C={current:null},D=Object.prototype.hasOwnProperty,E="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103,F={key:!0,ref:!0,__self:!0,__source:!0};function G(a,b,d,e,c,g,k){return{$$typeof:E,type:a,key:b,ref:d,props:k,_owner:g}}
G.createElement=function(a,b,d){var e,c={},g=null,k=null,m=null,q=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),m=void 0===b.__self?null:b.__self,q=void 0===b.__source?null:b.__source,b)D.call(b,e)&&!F.hasOwnProperty(e)&&(c[e]=b[e]);var l=arguments.length-2;if(1===l)c.children=d;else if(1<l){for(var h=Array(l),n=0;n<l;n++)h[n]=arguments[n+2];c.children=h}if(a&&a.defaultProps)for(e in l=a.defaultProps,l)void 0===c[e]&&(c[e]=l[e]);return G(a,g,k,m,q,C.current,c)};
G.createFactory=function(a){var b=G.createElement.bind(null,a);b.type=a;return b};G.cloneAndReplaceKey=function(a,b){return G(a.type,b,a.ref,a._self,a._source,a._owner,a.props)};
G.cloneElement=function(a,b,d){var e=f({},a.props),c=a.key,g=a.ref,k=a._self,m=a._source,q=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,q=C.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(h in b)D.call(b,h)&&!F.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==l?l[h]:b[h])}var h=arguments.length-2;if(1===h)e.children=d;else if(1<h){l=Array(h);for(var n=0;n<h;n++)l[n]=arguments[n+2];e.children=l}return G(a.type,c,g,k,m,q,e)};
G.isValidElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===E};var H="function"===typeof Symbol&&Symbol.iterator,I="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var J=/\/+/g,K=[];
function L(a,b,d,e){if(K.length){var c=K.pop();c.result=a;c.keyPrefix=b;c.func=d;c.context=e;c.count=0;return c}return{result:a,keyPrefix:b,func:d,context:e,count:0}}function M(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>K.length&&K.push(a)}
function N(a,b,d,e){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;if(null===a||"string"===c||"number"===c||"object"===c&&a.$$typeof===I)return d(e,a,""===b?"."+O(a,0):b),1;var g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){c=a[k];var m=b+O(c,k);g+=N(c,m,d,e)}else if(m=H&&a[H]||a["@@iterator"],"function"===typeof m)for(a=m.call(a),k=0;!(c=a.next()).done;)c=c.value,m=b+O(c,k++),g+=N(c,m,d,e);else"object"===c&&(d=""+a,t("31","[object Object]"===d?"object with keys {"+
Object.keys(a).join(", ")+"}":d,""));return g}function O(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function P(a,b){a.func.call(a.context,b,a.count++)}function Q(a,b,d){var e=a.result,c=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?R(a,e,d,r.thatReturnsArgument):null!=a&&(G.isValidElement(a)&&(a=G.cloneAndReplaceKey(a,c+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(J,"$\x26/")+"/")+d)),e.push(a))}
function R(a,b,d,e,c){var g="";null!=d&&(g=(""+d).replace(J,"$\x26/")+"/");b=L(b,g,e,c);null==a||N(a,"",Q,b);M(b)}var S={forEach:function(a,b,d){if(null==a)return a;b=L(null,null,b,d);null==a||N(a,"",P,b);M(b)},map:function(a,b,d){if(null==a)return a;var e=[];R(a,e,null,b,d);return e},count:function(a){return null==a?0:N(a,"",r.thatReturnsNull,null)},toArray:function(a){var b=[];R(a,b,null,r.thatReturnsArgument);return b}};
module.exports={Children:{map:S.map,forEach:S.forEach,count:S.count,toArray:S.toArray,only:function(a){G.isValidElement(a)?void 0:t("143");return a}},Component:B.Component,PureComponent:B.PureComponent,unstable_AsyncComponent:B.AsyncComponent,createElement:G.createElement,cloneElement:G.cloneElement,isValidElement:G.isValidElement,createFactory:G.createFactory,version:"16.0.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:C,assign:f}};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.0.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== "production") {
(function() {

'use strict';

var objectAssign$1 = __webpack_require__(3);
var require$$0 = __webpack_require__(5);
var emptyObject = __webpack_require__(4);
var invariant = __webpack_require__(1);
var emptyFunction = __webpack_require__(2);
var checkPropTypes = __webpack_require__(10);

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule reactProdInvariant
 * 
 */

{
  var warning = require$$0;
}

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass');
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var ReactNoopUpdateQueue_1 = ReactNoopUpdateQueue;

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule lowPriorityWarning
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning_1 = lowPriorityWarning;

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(ReactComponent.prototype, methodName, {
      get: function () {
        lowPriorityWarning_1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
var pureComponentPrototype = ReactPureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
objectAssign$1(pureComponentPrototype, ReactComponent.prototype);
pureComponentPrototype.isPureReactComponent = true;

function ReactAsyncComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

var asyncComponentPrototype = ReactAsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = ReactAsyncComponent;
// Avoid an extra prototype jump for these methods.
objectAssign$1(asyncComponentPrototype, ReactComponent.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

var ReactBaseClasses = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent,
  AsyncComponent: ReactAsyncComponent
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactCurrentOwner
 * 
 */

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var ReactCurrentOwner_1 = ReactCurrentOwner;

var hasOwnProperty = Object.prototype.hasOwnProperty;

{
  var warning$2 = require$$0;
}

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE$1 = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning$2(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning$2(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE$1,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/react-api.html#createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE$1) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner_1.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/react-api.html#createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/react-api.html#cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = objectAssign$1({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner_1.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE$1;
};

var ReactElement_1 = ReactElement;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactDebugCurrentFrame
 * 
 */

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var ReactDebugCurrentFrame_1 = ReactDebugCurrentFrame;

{
  var warning$1 = require$$0;

  var _require = ReactDebugCurrentFrame_1,
      getStackAddendum = _require.getStackAddendum;
}

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = ITERATOR_SYMBOL && children[ITERATOR_SYMBOL] || children[FAUX_ITERATOR_SYMBOL];
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning$1(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement_1.isValidElement(mappedChild)) {
      mappedChild = ReactElement_1.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  count: countChildren,
  toArray: toArray
};

var ReactChildren_1 = ReactChildren;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactVersion
 */

var ReactVersion = '16.0.0';

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement_1.isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var onlyChild_1 = onlyChild;

/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule describeComponentFrame
 */

var describeComponentFrame$1 = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getComponentName
 * 
 */

function getComponentName$1(instanceOrFiber) {
  if (typeof instanceOrFiber.getName === 'function') {
    // Stack reconciler
    var instance = instanceOrFiber;
    return instance.getName();
  }
  if (typeof instanceOrFiber.tag === 'number') {
    // Fiber reconciler
    var fiber = instanceOrFiber;
    var type = fiber.type;

    if (typeof type === 'string') {
      return type;
    }
    if (typeof type === 'function') {
      return type.displayName || type.name;
    }
  }
  return null;
}

var getComponentName_1 = getComponentName$1;

{
  var checkPropTypes$1 = checkPropTypes;
  var lowPriorityWarning$1 = lowPriorityWarning_1;
  var ReactDebugCurrentFrame$1 = ReactDebugCurrentFrame_1;
  var warning$3 = require$$0;
  var describeComponentFrame = describeComponentFrame$1;
  var getComponentName = getComponentName_1;

  var currentlyValidatingElement = null;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum$1 = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame$1.getStackAddendum() || '';
    return stack;
  };
}

var ITERATOR_SYMBOL$1 = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL$1 = '@@iterator'; // Before Symbol spec.

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner_1.current) {
    var name = getComponentName(ReactCurrentOwner_1.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner_1.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning$3(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum$1());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement_1.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement_1.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = ITERATOR_SYMBOL$1 && node[ITERATOR_SYMBOL$1] || node[FAUX_ITERATOR_SYMBOL$1];
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement_1.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;

  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes$1(propTypes, element.props, 'prop', name, getStackAddendum$1);
    currentlyValidatingElement = null;
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning$3(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

var ReactElementValidator$1 = {
  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      var info = '';
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(props);
      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      info += ReactDebugCurrentFrame$1.getStackAddendum() || '';

      warning$3(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
    }

    var element = ReactElement_1.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator$1.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    {
      Object.defineProperty(validatedFactory, 'type', {
        enumerable: false,
        get: function () {
          lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
          Object.defineProperty(this, 'type', {
            value: type
          });
          return type;
        }
      });
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement_1.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }
};

var ReactElementValidator_1 = ReactElementValidator$1;

{
  var warning$4 = require$$0;
}

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(Object.prototype.hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function getDisplayName$1(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName = void 0;

  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  warning$4(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id);
  return describeComponentFrame$1(name || '', element && element._source, ownerName || '');
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? invariant(false, 'Item must have been set') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : void 0;
      !nextChild.isMounted ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? invariant(false, 'Item must have been set') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function () {
    var info = '';
    var currentOwner = ReactCurrentOwner_1.current;
    if (currentOwner) {
      !(typeof currentOwner.tag !== 'number') ? invariant(false, 'Fiber owners should not show up in Stack stack traces.') : void 0;
      if (typeof currentOwner._debugID === 'number') {
        info += ReactComponentTreeHook.getStackAddendumByID(currentOwner._debugID);
      }
    }
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName$1(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

var ReactComponentTreeHook_1 = ReactComponentTreeHook;

var createElement = ReactElement_1.createElement;
var createFactory = ReactElement_1.createFactory;
var cloneElement = ReactElement_1.cloneElement;

{
  var ReactElementValidator = ReactElementValidator_1;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var React = {
  Children: {
    map: ReactChildren_1.map,
    forEach: ReactChildren_1.forEach,
    count: ReactChildren_1.count,
    toArray: ReactChildren_1.toArray,
    only: onlyChild_1
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,
  unstable_AsyncComponent: ReactBaseClasses.AsyncComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement_1.isValidElement,

  createFactory: createFactory,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner_1,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: objectAssign$1
  }
};

{
  objectAssign$1(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactComponentTreeHook: ReactComponentTreeHook_1,
    ReactDebugCurrentFrame: ReactDebugCurrentFrame_1
  });
}

var ReactEntry = React;

module.exports = ReactEntry;

})();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(1);
  var warning = __webpack_require__(5);
  var ReactPropTypesSecret = __webpack_require__(11);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Gantt", [], factory);
	else if(typeof exports === 'object')
		exports["Gantt"] = factory();
	else
		root["Gantt"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Gantt;
	
	__webpack_require__(1);
	
	var _Bar = __webpack_require__(5);
	
	var _Bar2 = _interopRequireDefault(_Bar);
	
	var _Arrow = __webpack_require__(6);
	
	var _Arrow2 = _interopRequireDefault(_Arrow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Gantt(element, tasks, config) {
	
		var self = {};
	
		function init() {
			set_defaults();
	
			// expose methods
			self.change_view_mode = change_view_mode;
			self.unselect_all = unselect_all;
			self.view_is = view_is;
			self.get_bar = get_bar;
			self.trigger_event = trigger_event;
			self.refresh = refresh;
	
			// initialize with default view mode
			change_view_mode(self.config.view_mode);
		}
	
		function set_defaults() {
	
			var defaults = {
				header_height: 50,
				column_width: 30,
				step: 24,
				view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
				bar: {
					height: 20
				},
				arrow: {
					curve: 5
				},
				padding: 18,
				view_mode: 'Day',
				date_format: 'YYYY-MM-DD',
				custom_popup_html: null
			};
			self.config = Object.assign({}, defaults, config);
	
			reset_variables(tasks);
		}
	
		function reset_variables(tasks) {
	
			self.element = element;
			self._tasks = tasks;
	
			self._bars = [];
			self._arrows = [];
			self.element_groups = {};
		}
	
		function refresh(updated_tasks) {
			reset_variables(updated_tasks);
			change_view_mode(self.config.view_mode);
		}
	
		function change_view_mode(mode) {
			set_scale(mode);
			prepare();
			render();
			// fire viewmode_change event
			trigger_event('view_change', [mode]);
		}
	
		function prepare() {
			prepare_tasks();
			prepare_dependencies();
			prepare_dates();
			prepare_canvas();
		}
	
		function prepare_tasks() {
	
			// prepare tasks
			self.tasks = self._tasks.map(function (task, i) {
	
				// momentify
				task._start = moment(task.start, self.config.date_format);
				task._end = moment(task.end, self.config.date_format);
	
				// cache index
				task._index = i;
	
				// invalid dates
				if (!task.start && !task.end) {
					task._start = moment().startOf('day');
					task._end = moment().startOf('day').add(2, 'days');
				}
				if (!task.start && task.end) {
					task._start = task._end.clone().add(-2, 'days');
				}
				if (task.start && !task.end) {
					task._end = task._start.clone().add(2, 'days');
				}
	
				// invalid flag
				if (!task.start || !task.end) {
					task.invalid = true;
				}
	
				// dependencies
				if (typeof task.dependencies === 'string' || !task.dependencies) {
					var deps = [];
					if (task.dependencies) {
						deps = task.dependencies.split(',').map(function (d) {
							return d.trim();
						}).filter(function (d) {
							return d;
						});
					}
					task.dependencies = deps;
				}
	
				// uids
				if (!task.id) {
					task.id = generate_id(task);
				}
	
				return task;
			});
		}
	
		function prepare_dependencies() {
	
			self.dependency_map = {};
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = self.tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
	
					try {
						for (var _iterator2 = t.dependencies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var d = _step2.value;
	
							self.dependency_map[d] = self.dependency_map[d] || [];
							self.dependency_map[d].push(t.id);
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	
		function prepare_dates() {
	
			self.gantt_start = self.gantt_end = null;
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;
	
			try {
				for (var _iterator3 = self.tasks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var task = _step3.value;
	
					// set global start and end date
					if (!self.gantt_start || task._start < self.gantt_start) {
						self.gantt_start = task._start;
					}
					if (!self.gantt_end || task._end > self.gantt_end) {
						self.gantt_end = task._end;
					}
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
	
			set_gantt_dates();
			setup_dates();
		}
	
		function prepare_canvas() {
			if (self.canvas) return;
			self.canvas = Snap(self.element).addClass('gantt');
		}
	
		function render() {
			clear();
			setup_groups();
			make_grid();
			make_dates();
			make_bars();
			make_arrows();
			map_arrows_on_bars();
			set_width();
			set_scroll_position();
			bind_grid_click();
		}
	
		function clear() {
			self.canvas.clear();
			self._bars = [];
			self._arrows = [];
		}
	
		function set_gantt_dates() {
	
			if (view_is(['Quarter Day', 'Half Day'])) {
				self.gantt_start = self.gantt_start.clone().subtract(7, 'day');
				self.gantt_end = self.gantt_end.clone().add(7, 'day');
			} else if (view_is('Month')) {
				self.gantt_start = self.gantt_start.clone().startOf('year');
				self.gantt_end = self.gantt_end.clone().endOf('month').add(1, 'year');
			} else {
				self.gantt_start = self.gantt_start.clone().startOf('month').subtract(1, 'month');
				self.gantt_end = self.gantt_end.clone().endOf('month').add(1, 'month');
			}
		}
	
		function setup_dates() {
	
			self.dates = [];
			var cur_date = null;
	
			while (cur_date === null || cur_date < self.gantt_end) {
				if (!cur_date) {
					cur_date = self.gantt_start.clone();
				} else {
					cur_date = view_is('Month') ? cur_date.clone().add(1, 'month') : cur_date.clone().add(self.config.step, 'hours');
				}
				self.dates.push(cur_date);
			}
		}
	
		function setup_groups() {
	
			var groups = ['grid', 'date', 'arrow', 'progress', 'bar', 'details'];
			// make group layers
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;
	
			try {
				for (var _iterator4 = groups[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var group = _step4.value;
	
					self.element_groups[group] = self.canvas.group().attr({ 'id': group });
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
		}
	
		function set_scale(scale) {
			self.config.view_mode = scale;
	
			if (scale === 'Day') {
				self.config.step = 24;
				self.config.column_width = 38;
			} else if (scale === 'Half Day') {
				self.config.step = 24 / 2;
				self.config.column_width = 38;
			} else if (scale === 'Quarter Day') {
				self.config.step = 24 / 4;
				self.config.column_width = 38;
			} else if (scale === 'Week') {
				self.config.step = 24 * 7;
				self.config.column_width = 140;
			} else if (scale === 'Month') {
				self.config.step = 24 * 30;
				self.config.column_width = 120;
			}
		}
	
		function set_width() {
			var cur_width = self.canvas.node.getBoundingClientRect().width;
			var actual_width = self.canvas.select('#grid .grid-row').attr('width');
			if (cur_width < actual_width) {
				self.canvas.attr('width', actual_width);
			}
		}
	
		function set_scroll_position() {
			var parent_element = document.querySelector(self.element).parentElement;
			if (!parent_element) return;
	
			var scroll_pos = get_min_date().diff(self.gantt_start, 'hours') / self.config.step * self.config.column_width - self.config.column_width;
			parent_element.scrollLeft = scroll_pos;
		}
	
		function get_min_date() {
			var task = self.tasks.reduce(function (acc, curr) {
				return curr._start.isSameOrBefore(acc._start) ? curr : acc;
			});
			return task._start;
		}
	
		function make_grid() {
			make_grid_background();
			make_grid_rows();
			make_grid_header();
			make_grid_ticks();
			make_grid_highlights();
		}
	
		function make_grid_background() {
	
			var grid_width = self.dates.length * self.config.column_width,
			    grid_height = self.config.header_height + self.config.padding + (self.config.bar.height + self.config.padding) * self.tasks.length;
	
			self.canvas.rect(0, 0, grid_width, grid_height).addClass('grid-background').appendTo(self.element_groups.grid);
	
			self.canvas.attr({
				height: grid_height + self.config.padding,
				width: '100%'
			});
		}
	
		function make_grid_header() {
			var header_width = self.dates.length * self.config.column_width,
			    header_height = self.config.header_height + 10;
			self.canvas.rect(0, 0, header_width, header_height).addClass('grid-header').appendTo(self.element_groups.grid);
		}
	
		function make_grid_rows() {
	
			var rows = self.canvas.group().appendTo(self.element_groups.grid),
			    lines = self.canvas.group().appendTo(self.element_groups.grid),
			    row_width = self.dates.length * self.config.column_width,
			    row_height = self.config.bar.height + self.config.padding;
	
			var row_y = self.config.header_height + self.config.padding / 2;
	
			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;
	
			try {
				for (var _iterator5 = self.tasks[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var task = _step5.value;
					// eslint-disable-line
					self.canvas.rect(0, row_y, row_width, row_height).addClass('grid-row').appendTo(rows);
	
					self.canvas.line(0, row_y + row_height, row_width, row_y + row_height).addClass('row-line').appendTo(lines);
	
					row_y += self.config.bar.height + self.config.padding;
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}
		}
	
		function make_grid_ticks() {
			var tick_x = 0,
			    tick_y = self.config.header_height + self.config.padding / 2,
			    tick_height = (self.config.bar.height + self.config.padding) * self.tasks.length;
	
			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;
	
			try {
				for (var _iterator6 = self.dates[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
					var date = _step6.value;
	
					var tick_class = 'tick';
					// thick tick for monday
					if (view_is('Day') && date.day() === 1) {
						tick_class += ' thick';
					}
					// thick tick for first week
					if (view_is('Week') && date.date() >= 1 && date.date() < 8) {
						tick_class += ' thick';
					}
					// thick ticks for quarters
					if (view_is('Month') && date.month() % 3 === 0) {
						tick_class += ' thick';
					}
	
					self.canvas.path(Snap.format('M {x} {y} v {height}', {
						x: tick_x,
						y: tick_y,
						height: tick_height
					})).addClass(tick_class).appendTo(self.element_groups.grid);
	
					if (view_is('Month')) {
						tick_x += date.daysInMonth() * self.config.column_width / 30;
					} else {
						tick_x += self.config.column_width;
					}
				}
			} catch (err) {
				_didIteratorError6 = true;
				_iteratorError6 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion6 && _iterator6.return) {
						_iterator6.return();
					}
				} finally {
					if (_didIteratorError6) {
						throw _iteratorError6;
					}
				}
			}
		}
	
		function make_grid_highlights() {
	
			// highlight today's date
			if (view_is('Day')) {
				var x = moment().startOf('day').diff(self.gantt_start, 'hours') / self.config.step * self.config.column_width;
				var y = 0;
				var width = self.config.column_width;
				var height = (self.config.bar.height + self.config.padding) * self.tasks.length + self.config.header_height + self.config.padding / 2;
	
				self.canvas.rect(x, y, width, height).addClass('today-highlight').appendTo(self.element_groups.grid);
			}
		}
	
		function make_dates() {
			var _iteratorNormalCompletion7 = true;
			var _didIteratorError7 = false;
			var _iteratorError7 = undefined;
	
			try {
	
				for (var _iterator7 = get_dates_to_draw()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
					var date = _step7.value;
	
					self.canvas.text(date.lower_x, date.lower_y, date.lower_text).addClass('lower-text').appendTo(self.element_groups.date);
	
					if (date.upper_text) {
						var $upper_text = self.canvas.text(date.upper_x, date.upper_y, date.upper_text).addClass('upper-text').appendTo(self.element_groups.date);
	
						// remove out-of-bound dates
						if ($upper_text.getBBox().x2 > self.element_groups.grid.getBBox().width) {
							$upper_text.remove();
						}
					}
				}
			} catch (err) {
				_didIteratorError7 = true;
				_iteratorError7 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion7 && _iterator7.return) {
						_iterator7.return();
					}
				} finally {
					if (_didIteratorError7) {
						throw _iteratorError7;
					}
				}
			}
		}
	
		function get_dates_to_draw() {
			var last_date = null;
			var dates = self.dates.map(function (date, i) {
				var d = get_date_info(date, last_date, i);
				last_date = date;
				return d;
			});
			return dates;
		}
	
		function get_date_info(date, last_date, i) {
			if (!last_date) {
				last_date = date.clone().add(1, 'year');
			}
			var date_text = {
				'Quarter Day_lower': date.format('HH'),
				'Half Day_lower': date.format('HH'),
				'Day_lower': date.date() !== last_date.date() ? date.format('D') : '',
				'Week_lower': date.month() !== last_date.month() ? date.format('D MMM') : date.format('D'),
				'Month_lower': date.format('MMMM'),
				'Quarter Day_upper': date.date() !== last_date.date() ? date.format('D MMM') : '',
				'Half Day_upper': date.date() !== last_date.date() ? date.month() !== last_date.month() ? date.format('D MMM') : date.format('D') : '',
				'Day_upper': date.month() !== last_date.month() ? date.format('MMMM') : '',
				'Week_upper': date.month() !== last_date.month() ? date.format('MMMM') : '',
				'Month_upper': date.year() !== last_date.year() ? date.format('YYYY') : ''
			};
	
			var base_pos = {
				x: i * self.config.column_width,
				lower_y: self.config.header_height,
				upper_y: self.config.header_height - 25
			};
	
			var x_pos = {
				'Quarter Day_lower': self.config.column_width * 4 / 2,
				'Quarter Day_upper': 0,
				'Half Day_lower': self.config.column_width * 2 / 2,
				'Half Day_upper': 0,
				'Day_lower': self.config.column_width / 2,
				'Day_upper': self.config.column_width * 30 / 2,
				'Week_lower': 0,
				'Week_upper': self.config.column_width * 4 / 2,
				'Month_lower': self.config.column_width / 2,
				'Month_upper': self.config.column_width * 12 / 2
			};
	
			return {
				upper_text: date_text[self.config.view_mode + '_upper'],
				lower_text: date_text[self.config.view_mode + '_lower'],
				upper_x: base_pos.x + x_pos[self.config.view_mode + '_upper'],
				upper_y: base_pos.upper_y,
				lower_x: base_pos.x + x_pos[self.config.view_mode + '_lower'],
				lower_y: base_pos.lower_y
			};
		}
	
		function make_arrows() {
			self._arrows = [];
			var _iteratorNormalCompletion8 = true;
			var _didIteratorError8 = false;
			var _iteratorError8 = undefined;
	
			try {
				var _loop = function _loop() {
					var task = _step8.value;
	
					var arrows = [];
					arrows = task.dependencies.map(function (dep) {
						var dependency = get_task(dep);
						if (!dependency) return;
	
						var arrow = (0, _Arrow2.default)(self, // gt
						self._bars[dependency._index], // from_task
						self._bars[task._index] // to_task
						);
						self.element_groups.arrow.add(arrow.element);
						return arrow; // eslint-disable-line
					}).filter(function (arr) {
						return arr;
					}); // filter falsy values
					self._arrows = self._arrows.concat(arrows);
				};
	
				for (var _iterator8 = self.tasks[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
					_loop();
				}
			} catch (err) {
				_didIteratorError8 = true;
				_iteratorError8 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion8 && _iterator8.return) {
						_iterator8.return();
					}
				} finally {
					if (_didIteratorError8) {
						throw _iteratorError8;
					}
				}
			}
		}
	
		function make_bars() {
	
			self._bars = self.tasks.map(function (task) {
				var bar = (0, _Bar2.default)(self, task);
				self.element_groups.bar.add(bar.group);
				return bar;
			});
		}
	
		function map_arrows_on_bars() {
			var _iteratorNormalCompletion9 = true;
			var _didIteratorError9 = false;
			var _iteratorError9 = undefined;
	
			try {
				var _loop2 = function _loop2() {
					var bar = _step9.value;
	
					bar.arrows = self._arrows.filter(function (arrow) {
						return arrow.from_task.task.id === bar.task.id || arrow.to_task.task.id === bar.task.id;
					});
				};
	
				for (var _iterator9 = self._bars[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
					_loop2();
				}
			} catch (err) {
				_didIteratorError9 = true;
				_iteratorError9 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion9 && _iterator9.return) {
						_iterator9.return();
					}
				} finally {
					if (_didIteratorError9) {
						throw _iteratorError9;
					}
				}
			}
		}
	
		function bind_grid_click() {
			self.element_groups.grid.click(function () {
				unselect_all();
				self.element_groups.details.selectAll('.details-wrapper').forEach(function (el) {
					return el.addClass('hide');
				});
			});
		}
	
		function unselect_all() {
			self.canvas.selectAll('.bar-wrapper').forEach(function (el) {
				el.removeClass('active');
			});
		}
	
		function view_is(modes) {
			if (typeof modes === 'string') {
				return self.config.view_mode === modes;
			} else if (Array.isArray(modes)) {
				var _iteratorNormalCompletion10 = true;
				var _didIteratorError10 = false;
				var _iteratorError10 = undefined;
	
				try {
					for (var _iterator10 = modes[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
						var mode = _step10.value;
	
						if (self.config.view_mode === mode) return true;
					}
				} catch (err) {
					_didIteratorError10 = true;
					_iteratorError10 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion10 && _iterator10.return) {
							_iterator10.return();
						}
					} finally {
						if (_didIteratorError10) {
							throw _iteratorError10;
						}
					}
				}
	
				return false;
			}
		}
	
		function get_task(id) {
			return self.tasks.find(function (task) {
				return task.id === id;
			});
		}
	
		function get_bar(id) {
			return self._bars.find(function (bar) {
				return bar.task.id === id;
			});
		}
	
		function generate_id(task) {
			return task.name + '_' + Math.random().toString(36).slice(2, 12);
		}
	
		function trigger_event(event, args) {
			if (self.config['on_' + event]) {
				self.config['on_' + event].apply(null, args);
			}
		}
	
		init();
	
		return self;
	} /* global moment, Snap */
	/**
	 * Gantt:
	 * 	element: querySelector string, required
	 * 	tasks: array of tasks, required
	 *   task: { id, name, start, end, progress, dependencies, custom_class }
	 * 	config: configuration options, optional
	 */
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/sass-loader/index.js?sourceMap!./gantt.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/sass-loader/index.js?sourceMap!./gantt.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".gantt .grid-background {\n  fill: none; }\n\n.gantt .grid-header {\n  fill: #ffffff;\n  stroke: #e0e0e0;\n  stroke-width: 1.4; }\n\n.gantt .grid-row {\n  fill: #ffffff; }\n\n.gantt .grid-row:nth-child(even) {\n  fill: #f5f5f5; }\n\n.gantt .row-line {\n  stroke: #ebeff2; }\n\n.gantt .tick {\n  stroke: #e0e0e0;\n  stroke-width: 0.2; }\n  .gantt .tick.thick {\n    stroke-width: 0.4; }\n\n.gantt .today-highlight {\n  fill: #fcf8e3;\n  opacity: 0.5; }\n\n.gantt #arrow {\n  fill: none;\n  stroke: #666;\n  stroke-width: 1.4; }\n\n.gantt .bar {\n  fill: #b8c2cc;\n  stroke: #8D99A6;\n  stroke-width: 0;\n  transition: stroke-width .3s ease; }\n\n.gantt .bar-progress {\n  fill: #a3a3ff; }\n\n.gantt .bar-invalid {\n  fill: transparent;\n  stroke: #8D99A6;\n  stroke-width: 1;\n  stroke-dasharray: 5; }\n  .gantt .bar-invalid ~ .bar-label {\n    fill: #555; }\n\n.gantt .bar-label {\n  fill: #fff;\n  dominant-baseline: central;\n  text-anchor: middle;\n  font-size: 12px;\n  font-weight: lighter;\n  letter-spacing: 0.8px; }\n  .gantt .bar-label.big {\n    fill: #555;\n    text-anchor: start; }\n\n.gantt .handle {\n  fill: #ddd;\n  cursor: ew-resize;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .3s ease; }\n\n.gantt .bar-wrapper {\n  cursor: pointer; }\n  .gantt .bar-wrapper:hover .bar {\n    stroke-width: 2; }\n  .gantt .bar-wrapper:hover .handle {\n    visibility: visible;\n    opacity: 1; }\n  .gantt .bar-wrapper.active .bar {\n    stroke-width: 2; }\n\n.gantt .lower-text, .gantt .upper-text {\n  font-size: 12px;\n  text-anchor: middle; }\n\n.gantt .upper-text {\n  fill: #555; }\n\n.gantt .lower-text {\n  fill: #333; }\n\n.gantt #details .details-container {\n  background: #fff;\n  display: inline-block;\n  padding: 12px; }\n  .gantt #details .details-container h5, .gantt #details .details-container p {\n    margin: 0; }\n  .gantt #details .details-container h5 {\n    font-size: 12px;\n    font-weight: bold;\n    margin-bottom: 10px;\n    color: #555; }\n  .gantt #details .details-container p {\n    font-size: 12px;\n    margin-bottom: 6px;\n    color: #666; }\n  .gantt #details .details-container p:last-child {\n    margin-bottom: 0; }\n\n.gantt .hide {\n  display: none; }\n", "", {"version":3,"sources":["/./src/src/gantt.scss"],"names":[],"mappings":"AAYA;EAGE,WAAU,EACV;;AAJF;EAME,cAAa;EACb,gBAjBoB;EAkBpB,kBAAiB,EACjB;;AATF;EAWE,cAAa,EACb;;AAZF;EAcE,cAvBgB,EAwBhB;;AAfF;EAiBE,gBAzB0B,EA0B1B;;AAlBF;EAoBE,gBA9BoB;EA+BpB,kBAAiB,EAIjB;EAzBF;IAuBG,kBAAiB,EACjB;;AAxBH;EA2BE,cAlCoB;EAmCpB,aAAY,EACZ;;AA7BF;EAgCE,WAAU;EACV,aAvCe;EAwCf,kBAAiB,EACjB;;AAnCF;EAsCE,cAlDiB;EAmDjB,gBAlDkB;EAmDlB,gBAAe;EACf,kCAAiC,EACjC;;AA1CF;EA4CE,cA/CY,EAgDZ;;AA7CF;EA+CE,kBAAiB;EACjB,gBA3DkB;EA4DlB,gBAAe;EACf,oBAAmB,EAKnB;EAvDF;IAqDG,WA1Dc,EA2Dd;;AAtDH;EAyDE,WAAU;EACV,2BAA0B;EAC1B,oBAAmB;EACnB,gBAAe;EACf,qBAAoB;EACpB,sBAAqB,EAMrB;EApEF;IAiEG,WAtEc;IAuEd,mBAAkB,EAClB;;AAnEH;EAuEE,WAzEiB;EA0EjB,kBAAiB;EACjB,WAAU;EACV,mBAAkB;EAClB,6BAA4B,EAC5B;;AA5EF;EA+EE,gBAAe,EAkBf;EAjGF;IAmFI,gBAAe,EACf;EApFJ;IAuFI,oBAAmB;IACnB,WAAU,EACV;EAzFJ;IA8FI,gBAAe,EACf;;AA/FJ;EAoGE,gBAAe;EACf,oBAAmB,EACnB;;AAtGF;EAwGE,WA7Ge,EA8Gf;;AAzGF;EA2GE,WA/Ge,EAgHf;;AA5GF;EA+GE,iBAAgB;EAChB,sBAAqB;EACrB,cAAa,EAsBb;EAvIF;IAoHG,UAAS,EACT;EArHH;IAwHG,gBAAe;IACf,kBAAiB;IACjB,oBAAmB;IACnB,YAhIc,EAiId;EA5HH;IA+HG,gBAAe;IACf,mBAAkB;IAClB,YAvIc,EAwId;EAlIH;IAqIG,iBAAgB,EAChB;;AAtIH;EA0IE,cAAa,EACb","file":"gantt.scss","sourcesContent":["$bar-color: #b8c2cc;\n$bar-stroke: #8D99A6;\n$border-color: #e0e0e0;\n$light-bg: #f5f5f5;\n$light-border-color: #ebeff2;\n$light-yellow: #fcf8e3;\n$text-muted: #666;\n$text-light: #555;\n$text-color: #333;\n$blue: #a3a3ff;\n$handle-color: #ddd;\n\n.gantt {\n\n\t.grid-background {\n\t\tfill: none;\n\t}\n\t.grid-header {\n\t\tfill: #ffffff;\n\t\tstroke: $border-color;\n\t\tstroke-width: 1.4;\n\t}\n\t.grid-row {\n\t\tfill: #ffffff;\n\t}\n\t.grid-row:nth-child(even) {\n\t\tfill: $light-bg;\n\t}\n\t.row-line {\n\t\tstroke: $light-border-color;\n\t}\n\t.tick {\n\t\tstroke: $border-color;\n\t\tstroke-width: 0.2;\n\t\t&.thick {\n\t\t\tstroke-width: 0.4;\n\t\t}\n\t}\n\t.today-highlight {\n\t\tfill: $light-yellow;\n\t\topacity: 0.5;\n\t}\n\n\t#arrow {\n\t\tfill: none;\n\t\tstroke: $text-muted;\n\t\tstroke-width: 1.4;\n\t}\n\n\t.bar {\n\t\tfill: $bar-color;\n\t\tstroke: $bar-stroke;\n\t\tstroke-width: 0;\n\t\ttransition: stroke-width .3s ease;\n\t}\n\t.bar-progress {\n\t\tfill: $blue;\n\t}\n\t.bar-invalid {\n\t\tfill: transparent;\n\t\tstroke: $bar-stroke;\n\t\tstroke-width: 1;\n\t\tstroke-dasharray: 5;\n\n\t\t&~.bar-label {\n\t\t\tfill: $text-light;\n\t\t}\n\t}\n\t.bar-label {\n\t\tfill: #fff;\n\t\tdominant-baseline: central;\n\t\ttext-anchor: middle;\n\t\tfont-size: 12px;\n\t\tfont-weight: lighter;\n\t\tletter-spacing: 0.8px;\n\n\t\t&.big {\n\t\t\tfill: $text-light;\n\t\t\ttext-anchor: start;\n\t\t}\n\t}\n\n\t.handle {\n\t\tfill: $handle-color;\n\t\tcursor: ew-resize;\n\t\topacity: 0;\n\t\tvisibility: hidden;\n\t\ttransition: opacity .3s ease;\n\t}\n\n\t.bar-wrapper {\n\t\tcursor: pointer;\n\n\t\t&:hover {\n\t\t\t.bar {\n\t\t\t\tstroke-width: 2;\n\t\t\t}\n\n\t\t\t.handle {\n\t\t\t\tvisibility: visible;\n\t\t\t\topacity: 1;\n\t\t\t}\n\t\t}\n\n\t\t&.active {\n\t\t\t.bar {\n\t\t\t\tstroke-width: 2;\n\t\t\t}\n\t\t}\n\t}\n\n\t.lower-text, .upper-text {\n\t\tfont-size: 12px;\n\t\ttext-anchor: middle;\n\t}\n\t.upper-text {\n\t\tfill: $text-light;\n\t}\n\t.lower-text {\n\t\tfill: $text-color;\n\t}\n\n\t#details .details-container {\n\t\tbackground: #fff;\n\t\tdisplay: inline-block;\n\t\tpadding: 12px;\n\n\t\th5, p {\n\t\t\tmargin: 0;\n\t\t}\n\n\t\th5 {\n\t\t\tfont-size: 12px;\n\t\t\tfont-weight: bold;\n\t\t\tmargin-bottom: 10px;\n\t\t\tcolor: $text-light;\n\t\t}\n\n\t\tp {\n\t\t\tfont-size: 12px;\n\t\t\tmargin-bottom: 6px;\n\t\t\tcolor: $text-muted;\n\t\t}\n\n\t\tp:last-child {\n\t\t\tmargin-bottom: 0;\n\t\t}\n\t}\n\n\t.hide {\n\t\tdisplay: none;\n\t}\n}"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Bar;
	/* global Snap */
	/*
		Class: Bar
	
		Opts:
			gt: Gantt object
			task: task object
	*/
	
	function Bar(gt, task) {
	
		var self = {};
	
		function init() {
			set_defaults();
			prepare();
			draw();
			bind();
		}
	
		function set_defaults() {
			self.action_completed = false;
			self.task = task;
		}
	
		function prepare() {
			prepare_values();
			prepare_plugins();
		}
	
		function prepare_values() {
			self.invalid = self.task.invalid;
			self.height = gt.config.bar.height;
			self.x = compute_x();
			self.y = compute_y();
			self.corner_radius = 3;
			self.duration = (self.task._end.diff(self.task._start, 'hours') + 24) / gt.config.step;
			self.width = gt.config.column_width * self.duration;
			self.progress_width = gt.config.column_width * self.duration * (self.task.progress / 100) || 0;
			self.group = gt.canvas.group().addClass('bar-wrapper').addClass(self.task.custom_class || '');
			self.bar_group = gt.canvas.group().addClass('bar-group').appendTo(self.group);
			self.handle_group = gt.canvas.group().addClass('handle-group').appendTo(self.group);
		}
	
		function prepare_plugins() {
			Snap.plugin(function (Snap, Element, Paper, global, Fragment) {
				Element.prototype.getX = function () {
					return +this.attr('x');
				};
				Element.prototype.getY = function () {
					return +this.attr('y');
				};
				Element.prototype.getWidth = function () {
					return +this.attr('width');
				};
				Element.prototype.getHeight = function () {
					return +this.attr('height');
				};
				Element.prototype.getEndX = function () {
					return this.getX() + this.getWidth();
				};
			});
		}
	
		function draw() {
			draw_bar();
			draw_progress_bar();
			draw_label();
			draw_resize_handles();
		}
	
		function draw_bar() {
			self.$bar = gt.canvas.rect(self.x, self.y, self.width, self.height, self.corner_radius, self.corner_radius).addClass('bar').appendTo(self.bar_group);
			if (self.invalid) {
				self.$bar.addClass('bar-invalid');
			}
		}
	
		function draw_progress_bar() {
			if (self.invalid) return;
			self.$bar_progress = gt.canvas.rect(self.x, self.y, self.progress_width, self.height, self.corner_radius, self.corner_radius).addClass('bar-progress').appendTo(self.bar_group);
		}
	
		function draw_label() {
			gt.canvas.text(self.x + self.width / 2, self.y + self.height / 2, self.task.name).addClass('bar-label').appendTo(self.bar_group);
			update_label_position();
		}
	
		function draw_resize_handles() {
			if (self.invalid) return;
	
			var bar = self.$bar,
			    handle_width = 8;
	
			gt.canvas.rect(bar.getX() + bar.getWidth() - 9, bar.getY() + 1, handle_width, self.height - 2, self.corner_radius, self.corner_radius).addClass('handle right').appendTo(self.handle_group);
			gt.canvas.rect(bar.getX() + 1, bar.getY() + 1, handle_width, self.height - 2, self.corner_radius, self.corner_radius).addClass('handle left').appendTo(self.handle_group);
	
			if (self.task.progress && self.task.progress < 100) {
				gt.canvas.polygon(get_progress_polygon_points()).addClass('handle progress').appendTo(self.handle_group);
			}
		}
	
		function get_progress_polygon_points() {
			var bar_progress = self.$bar_progress;
			return [bar_progress.getEndX() - 5, bar_progress.getY() + bar_progress.getHeight(), bar_progress.getEndX() + 5, bar_progress.getY() + bar_progress.getHeight(), bar_progress.getEndX(), bar_progress.getY() + bar_progress.getHeight() - 8.66];
		}
	
		function bind() {
			if (self.invalid) return;
			setup_click_event();
			show_details();
			bind_resize();
			bind_drag();
			bind_resize_progress();
		}
	
		function show_details() {
			var popover_group = gt.element_groups.details;
			self.details_box = popover_group.select('.details-wrapper[data-task=\'' + self.task.id + '\']');
	
			if (!self.details_box) {
				self.details_box = gt.canvas.group().addClass('details-wrapper hide').attr('data-task', self.task.id).appendTo(popover_group);
	
				render_details();
	
				var f = gt.canvas.filter(Snap.filter.shadow(0, 1, 1, '#666', 0.6));
				self.details_box.attr({
					filter: f
				});
			}
	
			self.group.click(function (e) {
				if (self.action_completed) {
					// just finished a move action, wait for a few seconds
					return;
				}
				popover_group.selectAll('.details-wrapper').forEach(function (el) {
					return el.addClass('hide');
				});
				self.details_box.removeClass('hide');
			});
		}
	
		function render_details() {
			var _get_details_position = get_details_position(),
			    x = _get_details_position.x,
			    y = _get_details_position.y;
	
			self.details_box.transform('t' + x + ',' + y);
			self.details_box.clear();
	
			var html = get_details_html();
			var foreign_object = Snap.parse('<foreignObject width="5000" height="2000">\n\t\t\t\t<body xmlns="http://www.w3.org/1999/xhtml">\n\t\t\t\t\t' + html + '\n\t\t\t\t</body>\n\t\t\t\t</foreignObject>');
			self.details_box.append(foreign_object);
		}
	
		function get_details_html() {
	
			// custom html in config
			if (gt.config.custom_popup_html) {
				var _html = gt.config.custom_popup_html;
				if (typeof _html === 'string') {
					return _html;
				}
				if (isFunction(_html)) {
					return _html(task);
				}
			}
	
			var start_date = self.task._start.format('MMM D');
			var end_date = self.task._end.format('MMM D');
			var heading = self.task.name + ': ' + start_date + ' - ' + end_date;
	
			var line_1 = 'Duration: ' + self.duration + ' days';
			var line_2 = self.task.progress ? 'Progress: ' + self.task.progress : null;
	
			var html = '\n\t\t\t<div class="details-container">\n\t\t\t\t<h5>' + heading + '</h5>\n\t\t\t\t<p>' + line_1 + '</p>\n\t\t\t\t' + (line_2 ? '<p>' + line_2 + '</p>' : '') + '\n\t\t\t</div>\n\t\t';
			return html;
		}
	
		function get_details_position() {
			return {
				x: self.$bar.getEndX() + 2,
				y: self.$bar.getY() - 10
			};
		}
	
		function bind_resize() {
			var _get_handles = get_handles(),
			    left = _get_handles.left,
			    right = _get_handles.right;
	
			left.drag(onmove_left, onstart, onstop_left);
			right.drag(onmove_right, onstart, onstop_right);
	
			function onmove_right(dx, dy) {
				onmove_handle_right(dx, dy);
			}
			function onstop_right() {
				onstop_handle_right();
			}
	
			function onmove_left(dx, dy) {
				onmove_handle_left(dx, dy);
			}
			function onstop_left() {
				onstop_handle_left();
			}
		}
	
		function get_handles() {
			return {
				left: self.handle_group.select('.handle.left'),
				right: self.handle_group.select('.handle.right')
			};
		}
	
		function bind_drag() {
			self.bar_group.drag(onmove, onstart, onstop);
		}
	
		function bind_resize_progress() {
			var bar = self.$bar,
			    bar_progress = self.$bar_progress,
			    handle = self.group.select('.handle.progress');
			handle && handle.drag(on_move, on_start, on_stop);
	
			function on_move(dx, dy) {
				if (dx > bar_progress.max_dx) {
					dx = bar_progress.max_dx;
				}
				if (dx < bar_progress.min_dx) {
					dx = bar_progress.min_dx;
				}
	
				bar_progress.attr('width', bar_progress.owidth + dx);
				handle.attr('points', get_progress_polygon_points());
				bar_progress.finaldx = dx;
			}
			function on_stop() {
				if (!bar_progress.finaldx) return;
				progress_changed();
				set_action_completed();
			}
			function on_start() {
				bar_progress.finaldx = 0;
				bar_progress.owidth = bar_progress.getWidth();
				bar_progress.min_dx = -bar_progress.getWidth();
				bar_progress.max_dx = bar.getWidth() - bar_progress.getWidth();
			}
		}
	
		function onstart() {
			var bar = self.$bar;
			bar.ox = bar.getX();
			bar.oy = bar.getY();
			bar.owidth = bar.getWidth();
			bar.finaldx = 0;
			run_method_for_dependencies('onstart');
		}
		self.onstart = onstart;
	
		function onmove(dx, dy) {
			var bar = self.$bar;
			bar.finaldx = get_snap_position(dx);
			update_bar_position({ x: bar.ox + bar.finaldx });
			run_method_for_dependencies('onmove', [dx, dy]);
		}
		self.onmove = onmove;
	
		function onstop() {
			var bar = self.$bar;
			if (!bar.finaldx) return;
			date_changed();
			set_action_completed();
			run_method_for_dependencies('onstop');
		}
		self.onstop = onstop;
	
		function onmove_handle_left(dx, dy) {
			var bar = self.$bar;
			bar.finaldx = get_snap_position(dx);
			update_bar_position({
				x: bar.ox + bar.finaldx,
				width: bar.owidth - bar.finaldx
			});
			run_method_for_dependencies('onmove', [dx, dy]);
		}
		self.onmove_handle_left = onmove_handle_left;
	
		function onstop_handle_left() {
			var bar = self.$bar;
			if (bar.finaldx) date_changed();
			set_action_completed();
			run_method_for_dependencies('onstop');
		}
		self.onstop_handle_left = onstop_handle_left;
	
		function run_method_for_dependencies(fn, args) {
			var dm = gt.dependency_map;
			if (dm[self.task.id]) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = dm[self.task.id][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var deptask = _step.value;
	
						var dt = gt.get_bar(deptask);
						dt[fn].apply(dt, args);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}
	
		function onmove_handle_right(dx, dy) {
			var bar = self.$bar;
			bar.finaldx = get_snap_position(dx);
			update_bar_position({ width: bar.owidth + bar.finaldx });
		}
	
		function onstop_handle_right() {
			var bar = self.$bar;
			if (bar.finaldx) date_changed();
			set_action_completed();
		}
	
		function update_bar_position(_ref) {
			var _ref$x = _ref.x,
			    x = _ref$x === undefined ? null : _ref$x,
			    _ref$width = _ref.width,
			    width = _ref$width === undefined ? null : _ref$width;
	
			var bar = self.$bar;
			if (x) {
				// get all x values of parent task
				var xs = task.dependencies.map(function (dep) {
					return gt.get_bar(dep).$bar.getX();
				});
				// child task must not go before parent
				var valid_x = xs.reduce(function (prev, curr) {
					return x >= curr;
				}, x);
				if (!valid_x) {
					width = null;
					return;
				}
				update_attr(bar, 'x', x);
			}
			if (width && width >= gt.config.column_width) {
				update_attr(bar, 'width', width);
			}
			update_label_position();
			update_handle_position();
			update_progressbar_position();
			update_arrow_position();
			update_details_position();
		}
	
		function setup_click_event() {
			self.group.click(function () {
				if (self.action_completed) {
					// just finished a move action, wait for a few seconds
					return;
				}
				if (self.group.hasClass('active')) {
					gt.trigger_event('click', [self.task]);
				}
				gt.unselect_all();
				self.group.toggleClass('active');
			});
		}
	
		function date_changed() {
			var _compute_start_end_da = compute_start_end_date(),
			    new_start_date = _compute_start_end_da.new_start_date,
			    new_end_date = _compute_start_end_da.new_end_date;
	
			self.task._start = new_start_date;
			self.task._end = new_end_date;
			render_details();
			gt.trigger_event('date_change', [self.task, new_start_date, new_end_date]);
		}
	
		function progress_changed() {
			var new_progress = compute_progress();
			self.task.progress = new_progress;
			render_details();
			gt.trigger_event('progress_change', [self.task, new_progress]);
		}
	
		function set_action_completed() {
			self.action_completed = true;
			setTimeout(function () {
				return self.action_completed = false;
			}, 2000);
		}
	
		function compute_start_end_date() {
			var bar = self.$bar;
			var x_in_units = bar.getX() / gt.config.column_width;
			var new_start_date = gt.gantt_start.clone().add(x_in_units * gt.config.step, 'hours');
			var width_in_units = bar.getWidth() / gt.config.column_width;
			var new_end_date = new_start_date.clone().add(width_in_units * gt.config.step, 'hours');
			// lets say duration is 2 days
			// start_date = May 24 00:00:00
			// end_date = May 24 + 2 days = May 26 (incorrect)
			// so subtract 1 second so that
			// end_date = May 25 23:59:59
			new_end_date.add('-1', 'seconds');
			return { new_start_date: new_start_date, new_end_date: new_end_date };
		}
	
		function compute_progress() {
			var progress = self.$bar_progress.getWidth() / self.$bar.getWidth() * 100;
			return parseInt(progress, 10);
		}
	
		function compute_x() {
			var x = self.task._start.diff(gt.gantt_start, 'hours') / gt.config.step * gt.config.column_width;
	
			if (gt.view_is('Month')) {
				x = self.task._start.diff(gt.gantt_start, 'days') * gt.config.column_width / 30;
			}
			return x;
		}
	
		function compute_y() {
			return gt.config.header_height + gt.config.padding + self.task._index * (self.height + gt.config.padding);
		}
	
		function get_snap_position(dx) {
			var odx = dx,
			    rem = void 0,
			    position = void 0;
	
			if (gt.view_is('Week')) {
				rem = dx % (gt.config.column_width / 7);
				position = odx - rem + (rem < gt.config.column_width / 14 ? 0 : gt.config.column_width / 7);
			} else if (gt.view_is('Month')) {
				rem = dx % (gt.config.column_width / 30);
				position = odx - rem + (rem < gt.config.column_width / 60 ? 0 : gt.config.column_width / 30);
			} else {
				rem = dx % gt.config.column_width;
				position = odx - rem + (rem < gt.config.column_width / 2 ? 0 : gt.config.column_width);
			}
			return position;
		}
	
		function update_attr(element, attr, value) {
			value = +value;
			if (!isNaN(value)) {
				element.attr(attr, value);
			}
			return element;
		}
	
		function update_progressbar_position() {
			self.$bar_progress.attr('x', self.$bar.getX());
			self.$bar_progress.attr('width', self.$bar.getWidth() * (self.task.progress / 100));
		}
	
		function update_label_position() {
			var bar = self.$bar,
			    label = self.group.select('.bar-label');
			if (label.getBBox().width > bar.getWidth()) {
				label.addClass('big').attr('x', bar.getX() + bar.getWidth() + 5);
			} else {
				label.removeClass('big').attr('x', bar.getX() + bar.getWidth() / 2);
			}
		}
	
		function update_handle_position() {
			var bar = self.$bar;
			self.handle_group.select('.handle.left').attr({
				'x': bar.getX() + 1
			});
			self.handle_group.select('.handle.right').attr({
				'x': bar.getEndX() - 9
			});
			var handle = self.group.select('.handle.progress');
			handle && handle.attr('points', get_progress_polygon_points());
		}
	
		function update_arrow_position() {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;
	
			try {
				for (var _iterator2 = self.arrows[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var arrow = _step2.value;
	
					arrow.update();
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	
		function update_details_position() {
			var _get_details_position2 = get_details_position(),
			    x = _get_details_position2.x,
			    y = _get_details_position2.y;
	
			self.details_box && self.details_box.transform('t' + x + ',' + y);
		}
	
		function isFunction(functionToCheck) {
			var getType = {};
			return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
		}
	
		init();
	
		return self;
	}
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Arrow;
	/* global Snap */
	/*
		Class: Arrow
		from_task ---> to_task
	
		Opts:
			gantt (Gantt object)
			from_task (Bar object)
			to_task (Bar object)
	*/
	
	function Arrow(gt, from_task, to_task) {
	
		var self = {};
	
		function init() {
			self.from_task = from_task;
			self.to_task = to_task;
			prepare();
			draw();
		}
	
		function prepare() {
	
			self.start_x = from_task.$bar.getX() + from_task.$bar.getWidth() / 2;
	
			var condition = function condition() {
				return to_task.$bar.getX() < self.start_x + gt.config.padding && self.start_x > from_task.$bar.getX() + gt.config.padding;
			};
	
			while (condition()) {
				self.start_x -= 10;
			}
	
			self.start_y = gt.config.header_height + gt.config.bar.height + (gt.config.padding + gt.config.bar.height) * from_task.task._index + gt.config.padding;
	
			self.end_x = to_task.$bar.getX() - gt.config.padding / 2;
			self.end_y = gt.config.header_height + gt.config.bar.height / 2 + (gt.config.padding + gt.config.bar.height) * to_task.task._index + gt.config.padding;
	
			var from_is_below_to = from_task.task._index > to_task.task._index;
			self.curve = gt.config.arrow.curve;
			self.clockwise = from_is_below_to ? 1 : 0;
			self.curve_y = from_is_below_to ? -self.curve : self.curve;
			self.offset = from_is_below_to ? self.end_y + gt.config.arrow.curve : self.end_y - gt.config.arrow.curve;
	
			self.path = Snap.format('M {start_x} {start_y} V {offset} ' + 'a {curve} {curve} 0 0 {clockwise} {curve} {curve_y} ' + 'L {end_x} {end_y} m -5 -5 l 5 5 l -5 5', {
				start_x: self.start_x,
				start_y: self.start_y,
				end_x: self.end_x,
				end_y: self.end_y,
				offset: self.offset,
				curve: self.curve,
				clockwise: self.clockwise,
				curve_y: self.curve_y
			});
	
			if (to_task.$bar.getX() < from_task.$bar.getX() + gt.config.padding) {
				self.path = Snap.format('M {start_x} {start_y} v {down_1} ' + 'a {curve} {curve} 0 0 1 -{curve} {curve} H {left} ' + 'a {curve} {curve} 0 0 {clockwise} -{curve} {curve_y} V {down_2} ' + 'a {curve} {curve} 0 0 {clockwise} {curve} {curve_y} ' + 'L {end_x} {end_y} m -5 -5 l 5 5 l -5 5', {
					start_x: self.start_x,
					start_y: self.start_y,
					end_x: self.end_x,
					end_y: self.end_y,
					down_1: gt.config.padding / 2 - self.curve,
					down_2: to_task.$bar.getY() + to_task.$bar.getHeight() / 2 - self.curve_y,
					left: to_task.$bar.getX() - gt.config.padding,
					offset: self.offset,
					curve: self.curve,
					clockwise: self.clockwise,
					curve_y: self.curve_y
				});
			}
		}
	
		function draw() {
			self.element = gt.canvas.path(self.path).attr('data-from', self.from_task.task.id).attr('data-to', self.to_task.task.id);
		}
	
		function update() {
			// eslint-disable-line
			prepare();
			self.element.attr('d', self.path);
		}
		self.update = update;
	
		init();
	
		return self;
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=frappe-gantt.js.map

/***/ })
]);