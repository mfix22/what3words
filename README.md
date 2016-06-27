#what3words
### Node.js library for what3words API

###Getting started
```sh
$ npm install --save what3words
```
___
###Usage
###Node.js
```javascript
var w3w = require('what3words');
```

####Config
```javascript
var options = {
  key : '<YOUR_API_KEY_HERE>',
  lang : 'en',
  display : 'terse'
}

w3w.config(options);
```
###### Options
All config options can be overidden in function calls. Each config option will be included in every call that is not
overidden by the specific function call.

key _(required)_ - your API key (get yours [here](https://map.what3words.com/register?dev=true))
lang _(optional)_ - a supported w3w address language: `en (the default),de, ru, sv, pt, sw, it, fr, es or tr`.
format _(optional)_ - return data format type. Can be `json` (the default), `geojson` or `xml`
display _(optional)_ - return display type. Can be `full` (the default) or `terse`


#### Functions
For each of the functions below, all options are passed in the first function parameter. If a second parameter is included, that will be the functions callback. If not, the function will return a [`Promise`](https://www.npmjs.com/package/promise)

#####forward(options[, callback])
######options
* addr _(required)_ - a 3 word address as a string
* lang _(optional)_ - a supported w3w address language (see Config)
* format _(optional)_ - return data format type (see Config)
* display _(optional)_ - return display type (see Config)

#####reverse(options[, callback])
######options
* coords _(required)_ - coordinates as a comma separated string of latitude and longitude
* lang _(optional)_ - a supported w3w address language (see Config)
* format _(optional)_ - return data format type (see Config)
* display _(optional)_ - return display type (see Config)

#####autosuggest(options[, callback])
######options
* addr _(required)_ - a 3 word address as a string
* lang _(optional)_ - a supported w3w address language (see Config)
* format _(optional)_ - return data format type (see Config)
* display _(optional)_ - return display type (see Config)
* focus _(optional)_ - a location, specified as a latitude,longitude used to refine the results.
* clip _(optional)_ - Restricts results to those within a geographical area. If omitted defaults to `clip=none`.

#####standardblend(options[, callback])
######options
* addr _(required)_ - a 3 word address as a string
* lang _(optional)_ - a supported w3w address language (see Config)
* format _(optional)_ - return data format type (see Config)
* focus _(optional)_ - a location, specified as a latitude,longitude used to refine the results.

#####grid(options[, callback])
######options
* bbox _(required)_ - Bounding box, specified by the northeast and southwest corner coordinates, for which the grid should be returned
* format _(optional)_ - return data format type (see Config)
###### `languages(options[, callback])`
* format _(optional)_ - return data format type (see Config)
