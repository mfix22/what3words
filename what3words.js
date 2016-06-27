var Library = require('librarify');

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

module.exports = new Library(settings);
