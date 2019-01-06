var tl = require('./textlink');

exports.features = [
    {
        title: 'Simplicity',
        icon: 'faCode',
        text: `Instead of using control-flow tags that quickly become annoying to deal with, NHP uses a simple whitespace-based approach to separate JavaScript from markup.`
    },
    {
        title: 'Modularity',
        icon: 'faProjectDiagram',
        text: `NHP templates share many features with Node.js modules. They have their own scope and can have input and output besides the markup they generate.`
    },
    {
        title: 'Asynchronicity',
        icon: 'faRandom',
        text: `Thanks to JavaScript's async functions, NHP templates can easily render content that comes from external sources like a database or a web API.`
    },
    {
        title: 'Composability',
        icon: 'faPuzzlePiece',
        text: `Templates can include other templates and can require both local modules and external modules from ${ tl('npm') }. This gives you limitless flexibility!`
    }
];

exports.links = {
    repo: 'https://github.com/hdodov/nhp',
    siteRepo: 'https://github.com/hdodov/nhpjs.com',
    author: 'https://dodov.me/',
    syntaxRepo: 'https://github.com/hdodov/nhp-syntax-highlight',
    syntaxPage: 'https://github.com/hdodov/nhp/wiki/Syntax'
};