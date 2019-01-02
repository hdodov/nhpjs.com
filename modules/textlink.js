var links = {
    'Node.js': 'https://nodejs.org/',
    'npm': 'https://www.npmjs.com/',
    'fontawesome-svg-core': 'https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core',
    'template literal': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals',
    'Node module': 'https://nodejs.org/api/modules.html',
    'require()': 'https://nodejs.org/api/modules.html#modules_require',
    'ms': 'https://www.npmjs.com/package/ms',
    'async function': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function',
    'await': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await',
    'Promise': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
    'axios': 'https://github.com/axios/axios',
    'bacon ipsum': 'https://baconipsum.com/json-api/',
    'demos template': 'https://github.com/hdodov/nhpjs.com/blob/master/views/demos.nhp'
};

module.exports = function (text, key) {
    if (typeof key != 'string') {
        key = text;
    }

    return `<a href="${ links[key] || '#' }" target="_blank">${ text }</a>`;
};
