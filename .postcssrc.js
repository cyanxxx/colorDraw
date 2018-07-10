// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      utf8: false
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. viewportUnit: 'vw', // (String) Expected units. selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false
    },
    "postcss-viewport-units":{},
    "cssnano":{
      preset:"advanced",
      autoprefixer:false,
      "postcss-zindex":false
    }
  }
}
