# what3words library for Node.js applications

## Getting started
```sh
$ npm install --save what3words
```
## Usage
### Node.js
```javascript
var w3w = require('what3words');
```

#### Config
```javascript
w3w.config({
  key : '<YOUR_API_KEY_HERE>',
  lang : 'en',
  display : 'terse'
});
```
###### Options
All parameters are passed at `strings`. All config options can be overidden in function calls.
key (_required_) - your API key (get yours [here](https://map.what3words.com/register?dev=true))
lang (_optional_) - a supported w3w address language: `'en' (the default),'de', 'ru', 'sv', 'pt', 'sw', 'it', 'fr', 'es', 'tr'`.
format (_optional_) - return data format type. Can be `json` (the default), `geojson` or `xml`
display (_optional_) - return display type. Can be `full` (the default) or `terse`

#### Functions
###### `forward(parameters[, callback])`
###### `reverse(parameters[, callback])`
###### `autosuggest(parameters[, callback])`
###### `standardblend(parameters[, callback])`
###### `grid(parameters[, callback])`
###### `languages(parameters[, callback])`
