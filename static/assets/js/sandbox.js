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
