(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */

'use strict';

/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}

},{}],2:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
var Parser = require('./parser');
var transform = require('./transformer');

module.exports = function (content) {
    var parser = new Parser(content);
    parser.parse();

    return transform(content, parser.ast);
};

},{"./parser":4,"./transformer":5}],4:[function(require,module,exports){
const RE_WHITESPACE = /\s/;
const RE_ECHO_START = /^<echo(?:\s[^>]*)?>/i;
const RE_ECHO_END = /<\/echo\s*>/i;
const CH_NEWLINE= "\n\r\u2028\u2029";

class Parser {
    constructor (input) {
        this.content = input;
        this.ast = [];

        this.index = -1;
        this.node = null;
        this.context = null;
        this.beginLine = true;
    }

    char (offset = 0) {
        return this.content.charAt(this.index + offset);
    }

    remainder () {
        return this.content.substring(this.index);
    }

    forward (iterations) {
        while (iterations-- > 0) {
            this.next();
        }
    }

    setContext (type, index = this.index) {
        if (this.node) {
            if (index - this.node.start > 0) {
                this.node.end = index;
                this.ast.push(this.node);
            }

            this.node = null;
        }

        if (type) {
            this.node = {
                type,
                start: index,
                end: null
            };
        }

        this.context = type;
    }

    startLine () {
        if (
            this.lineLastPrintChar === '>' &&
            this.context === 'markup'
        ) {
            this.setContext(null);
        }

        this.lineIndex = this.index;
        this.lineFirstPrintChar = null;
        this.lineLastPrintChar = null;
    }

    readEcho () {
        var match = this.remainder().match(RE_ECHO_END);
        if (match && match.length) {
            this.forward(match.index + match[0].length);
            this.setContext(null);
        } else {
            throw new Error('Unclosed <echo> tag');
        }
    }

    checkToken () {
        if (
            this.lineFirstPrintChar === '<' &&
            this.context !== 'markup' &&
            this.context !== 'echo'
        ) {
            if (RE_ECHO_START.test(this.remainder())) {
                this.setContext('echo');
                this.readEcho();
            } else {
                this.setContext('markup', this.lineIndex);
            }
        }

        if (!this.context) {
            this.setContext('script');
        }
    }

    next () {
        this.index++;

        if (this.beginLine) {
            this.beginLine = false;
            this.startLine();
        }
  
        var currentChar = this.char();
        if (!RE_WHITESPACE.test(currentChar)) {
            if (this.lineFirstPrintChar === null) {
                this.lineFirstPrintChar = currentChar;
            } else {
                // Indicate that the first printable character passed
                this.lineFirstPrintChar = false;
            }

            this.lineLastPrintChar = currentChar;
        }

        if (CH_NEWLINE.indexOf(currentChar) >= 0) {
            // Avoid setting the flag when the current character is `\r` and
            // it's part of a `\r\n` sequence. Wait for `\n` to set it in the
            // next iteration.
            if (!(currentChar === '\r' && this.char(1) === '\n')) {
                this.beginLine = true;
            }
        }
    }

    parse () {
        while (this.index < this.content.length) {
            this.next();
            this.checkToken();
        }

        this.setContext(null);
    }
}

module.exports = Parser;

},{}],5:[function(require,module,exports){
const RE_ECHO = /^<echo(\s[\sa-zA-Z]*)?>([\s\S]*)<\/echo\s*>$/i;

function escapeString (input) {
    return input
        .replace(/\\/g, '\\\\')
        .replace(/(\r)?\n/g, '\\n')
        .replace(/"/g, '\\"');
}

function transformMarkup (input) {
    return `echo(\`${ input }\`);\n`;
}

function transformEcho (input) {
    var match = input.match(RE_ECHO),
        options,
        content;

    if (match && match.length === 3) {
        if (typeof match[1] == 'string') {
            options = match[1].trim().split(/\s+/);
        }

        content = match[2];

        if (options && options.indexOf('plain') >= 0) {
            content = '"' + escapeString(content) + '"';
        } else {
            content = '`' + content + '`';
        }

        if (options) {
            return `echo(${ content }, {${ options.map(el => `'${el}': true`).join(', ') }});`;
        } else {
            return `echo(${ content });`;
        }
    } else {
        throw new Error('Malformed echo tag');
    }
}

function mergeMarkupNodes (ast) {
    for (var i = 0; i < ast.length; i++) {
        var node = ast[i],
            nextNodeIndex = i + 1,
            nextNode = ast[nextNodeIndex];

        if (
            node.type === 'markup' &&
            nextNode &&
            nextNode.type === 'markup' &&
            nextNode.start === node.end
        ) {
            node.end = nextNode.end;
            ast.splice(nextNodeIndex, 1);
            i--;
        }
    }
}

module.exports = function (content, ast) {
    mergeMarkupNodes(ast);

    ast.forEach(function (node) {
        node.content = content.substring(node.start, node.end);

        if (node.type === 'echo') {
            node.content = transformEcho(node.content);
        } else if (node.type === 'markup') {
            node.content = transformMarkup(node.content);
        }
    });

    return ast.map(node => node.content).join('');
};

},{}],6:[function(require,module,exports){
var escapeHtml = require('escape-html');
var compile = require('nhpjs/lib/compiler');

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const RENDER_ARGS = [
    'input',
    'module',
    'exports',
    'echo',
    'capture'
];

class Renderer {
    constructor (code, args) {
        this.code = compile(code);
        this.fn = new AsyncFunction(...RENDER_ARGS, this.code);

        this.args = args || {};
        this.resolved = false;

        this.module = {
            exports: {},
            buffer: ''
        };
    }

    render () {
        var args = [
            this.args,
            this.module,
            this.module.exports,
            this.echo.bind(this),
            this.capture.bind(this)
        ];

        return this.fn(...args).then(() => {
            this.resolved = true;
            return Promise.resolve(this.module);
        });
    }

    capture (callback) {
        var cachedBuffer = this.module.buffer,
            captureBuffer = null,
            callbackResult;

        this.module.buffer = '';

        try {
            callbackResult = callback();
        } catch (error) {
            this.module.buffer = cachedBuffer;
            throw error;
        }

        if (
            callbackResult &&
            typeof callbackResult.then == 'function' &&
            typeof callbackResult.catch == 'function'
        ) {
            return callbackResult.then(() => {
                captureBuffer = this.module.buffer;
                this.module.buffer = cachedBuffer;
                return Promise.resolve(captureBuffer);
            }).catch((error) => {
                this.module.buffer = cachedBuffer;
                return Promise.reject(error);
            });
        } else {
            captureBuffer = this.module.buffer;
            this.module.buffer = cachedBuffer;
            return captureBuffer;
        }
    }

    echo (content, options) {
        if (options) {
            if (options.trim || options.strip) {
                content = content.trim();
            }

            if (options.strip) {
                content = content.replace(/(?<=^|>)\s+(?=<|$)/g, '');
            }

            if (options.escape) {
                content = escapeHtml(content);
            }
        }

        this.module.buffer += content;

        if (this.resolved) {
            console.warn('WARNING! Echoing in resolved template:', this.filePath, '(use `await`)');
        }
    }
}

module.exports = Renderer;

},{"escape-html":1,"nhpjs/lib/compiler":3}],7:[function(require,module,exports){
var escape = require('escape-html');
var debounce = require('lodash.debounce');
var Renderer = require('./renderer');

var container = document.getElementById('editor-container');
var output = document.getElementById('output');
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setOption("minLines", 25);
editor.setOption("maxLines", 25);
editor.session.setUseWorker(false);
editor.session.setMode("ace/mode/html");
editor.renderer.setScrollMargin(10, 10);

function display (data) {
    output.innerHTML = escape(data);
    hljs.highlightBlock(output);
}

function renderCode (code) {
    var renderer = null;
    var code = editor.getValue();

    try {
        renderer = new Renderer(code);
    } catch (err) {
        return display(err);
    }

    renderer.render().catch(err => {
        return Promise.resolve({
            buffer: err
        });
    }).then(res => {
        display(res.buffer);
    });
}

var debouncedRender = debounce(renderCode, 350);
editor.on('change', function () {
    debouncedRender(editor.getValue());
});

display(renderCode(editor.getValue()));
container.classList.remove('is-hidden');

},{"./renderer":6,"escape-html":1,"lodash.debounce":2}]},{},[7]);
