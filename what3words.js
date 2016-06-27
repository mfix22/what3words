var Request = require('request');
var Promise = require('promise');

var defaults = {
  lang : 'en',
  format : 'json',
  display : 'full'
}

var settings = {
  'url' : 'https://api.what3words.com/v2',
  'defaults' : {
    lang : 'en',
    format : 'json',
    display : 'full'
  },
  'fns' : {
    'forward' : {
      route : '/forward',
      requiredConfig : ['key'],
      requiredParam : ['addr'],
      optionalConfig : ['lang', 'format', 'display'],
      optionalParam : []
    },
    'reverse' : {
      route : '/reverse',
      requiredConfig : ['key'],
      requiredParam : ['coords'],
      optionalConfig : ['lang', 'format', 'display'],
      optionalParam : []
    },
    'autosuggest' : {
      route : '/autosuggest',
      requiredConfig : ['key'],
      requiredParam : ['addr'],
      optionalConfig : ['lang', 'format', 'display'],
      optionalParam : ['focus', 'clip']
    },
    'standardblend' : {
      route : '/standardblend',
      requiredConfig : ['key'],
      requiredParam : ['addr'],
      optionalConfig : ['lang', 'format'],
      optionalParam : ['focus']
    },
    'grid' : {
      requiredConfig : ['key'],
      requiredParam : ['bbox'],
      optionalConfig : ['format'],
      optionalParam : []
    },
    'languages' : {
      requiredConfig : ['key'],
      requiredParam : [],
      optionalConfig : ['format'],
      optionalParam : []
    }
  }
}

// TODO make this extensible
function config(config){
  this.key = config.key || settings.defaults.key;
  // set config or defaults
  this.lang = config.lang || settings.defaults.lang;
  this.format = config.format || settings.defaults.format;
  this.display = config.display || settings.defaults.display;
  return this;
}

function execute(params, callback){
  var fn = settings.fns[arguments.callee.caller.name];
  var address = settings.url + (fn.route || "/" + arguments.callee.caller.name) + "?";
  if (fn.requiredConfig)
    fn.requiredConfig.forEach((requirement) => {
      if (!this[requirement] && !params[requirement]) throw new Error(requirement + " is required.");
      address += requirement + "=" + (params[requirement] || this[requirement]) + "&";
    });
  if (fn.requiredParam)
    fn.requiredParam.forEach((requirement) => {
      if (!params[requirement]) throw new Error(requirement + " parameter is missing.");
      address += requirement + "=" + params[requirement] + "&";
    });
  if (fn.optionalConfig)
    fn.optionalConfig.forEach((option) => {
      address += option + "=" + (params[option] || this[option]) + "&";
    });
  if (fn.optionalParam)
    fn.optionalParam.forEach((option) => {
      if (params[option]) address += option + "=" + params[option] + "&";
    });
  if (arguments.length == 2) {
    Request.get(address, function (err, response, body) {
      if (err) callback(err, null);
      else{
        var ret = JSON.parse(body);
        if (ret.code || ret.status.code) callback(ret, null);
        else callback(null, ret);
      }
    });
  }
  // TODO consider removing promise
  else {
    return new Promise(function (fulfill, reject){
      Request.get(address, function (err, response, body) {
        if (err) reject(err);
        else{
          var ret = JSON.parse(body);
          if (ret.code) reject(ret);
          else fulfill(ret);
        }
      });
    });
  }
}

function forward(params, callback) {
  return execute.apply(this, arguments);
}

function reverse(params, callback) {
  return execute.apply(this, arguments);
}

function autosuggest(params, callback) {
  return execute.apply(this, arguments);
}

function standardblend(params, callback) {
  return execute.apply(this, arguments);
}

function grid(params, callback) {
  return execute.apply(this, arguments);
}

function languages(params, callback) {
  return execute.apply(this, arguments);
}

exports.forward = forward;
exports.reverse = reverse;
exports.autosuggest = autosuggest;
exports.standardblend = standardblend;
exports.grid = grid;
exports.languages = languages
exports.config = config;
