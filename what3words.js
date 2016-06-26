var Request = require('request');
var Promise = require('promise');

var fns = {
  'forward' : {
    baseURL : 'https://api.what3words.com/v2/forward',
    requiredConfig : ['key'],
    requiredParam : ['addr'],
    optionalConfig : ['lang', 'format', 'display'],
    optionalParam : []
  },
  'reverse' : {
    baseURL : 'https://api.what3words.com/v2/reverse',
    requiredConfig : ['key'],
    requiredParam : ['coords'],
    optionalConfig : ['lang', 'format', 'display'],
    optionalParam : []
  },
  'autosuggest' : {
    baseURL : 'https://api.what3words.com/v2/autosuggest',
    requiredConfig : ['key'],
    requiredParam : ['addr'],
    optionalConfig : ['lang', 'format', 'display'],
    optionalParam : ['focus', 'clip']
  },
  'standardblend' : {
    baseURL : 'https://api.what3words.com/v2/standardblend',
    requiredConfig : ['key'],
    requiredParam : ['addr'],
    optionalConfig : ['lang', 'format'],
    optionalParam : ['focus']
  }
}

function config(config){
  this.key = config.key;
  // set config or defaults
  this.lang = config.lang || 'en';
  this.format = config.format || 'json';
  this.display = config.display || 'full';
  return this;
}

function execute(params, callback){
  var fn = fns[arguments.callee.caller.name];
  var address = fn.baseURL + "?";
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
        if (ret.status.code) callback(ret.status.message, null);
        else callback(null, JSON.parse(body));
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
          if (ret.status.code) reject(ret.status.message);
          else fulfill(JSON.parse(body));
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

exports.forward = forward;
exports.reverse = reverse;
exports.autosuggest = autosuggest;
exports.standardblend = standardblend;
exports.config = config;
