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
