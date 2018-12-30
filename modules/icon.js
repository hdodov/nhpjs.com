var icons = require('@fortawesome/free-solid-svg-icons');

module.exports = function (icon) {
    var data = icons[icon];

    if (!data) {
        data = icons.faTimes;
    }

    data = data.icon;

    return `
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ data[0] } ${ data[1] }">
        <path d="${ data[4] }"/>
    </svg>`;
};
