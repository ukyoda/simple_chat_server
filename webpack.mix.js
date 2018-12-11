const mix = require('webpack-mix').mix;

mix.react('front/app.js', 'static/js/')
    .sourceMaps();