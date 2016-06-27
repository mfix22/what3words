var w3w = require('../what3words');
var assert = require('assert');
w3w.config({
  key : 'TBJKS6ER', // <INSERT_YOUR_API_KEY_HERE>
  lang : 'en'
});

w3w.forward({
  addr : 'steep.sober.potato',
  display : 'terse'
}, function (err, res){
  if (err) console.log(JSON.stringify(err, null, 4));
  else {
    assert.equal(res.status.status, 200);
    assert.equal(res.status.reason, "OK");
  }
});

w3w.forward({
  addr : 'steep.sober.potato',
  display : 'terse'
}).done(function(res){
  // console.log('PROMISE:', JSON.stringify(res, null, 4));
  assert.equal(res.status.status,200);
  assert.equal(res.status.reason, "OK")
});

w3w.forward({
  addr : 'steep.bleh.potato',
  display : 'terse'
}, function(err, res){
  assert.equal(res.status.code, 300);
  assert.equal(res.status.message, 'Invalid or non-existent 3 word address');
});

w3w.reverse({
  coords : '51.521251,-0.203586',
}, function(err, res){
  assert.equal(res.status.status,200);
  assert.equal(res.status.reason, "OK")
});

w3w.autosuggest({
   addr : 'plan.clips.a',
   focus : '51.521251,-0.203586',
   clip : "radius(51.4243877,-0.3474524,10)"
}, function(err, res){
  assert.equal(res.status.status,200);
  assert.equal(res.status.reason, "OK")
});

w3w.autosuggest({
   addr : 'plan.clips.a',
   focus : '51.521251,-0.203586',
   clip : "radius(51.4243877,-0.34"
}, function(err, res){
  assert.equal(res.status.code, 106);
});
w3w.standardblend({
   addr : 'plan.clips.above',
   focus : '51.4243877,-0.3474524',
}, function(err, res){
  assert.equal(res.status.status,200);
  assert.equal(res.status.reason, "OK")
});

w3w.grid({
   bbox : '52.208867,0.117540,52.207988,0.116126',
}, function(err, res){
  assert.equal(res.status.status,200);
  assert.equal(res.status.reason, "OK")
});

w3w.languages({
}, function(err, res){
  assert.equal(res.status.status,200);
  assert.equal(res.status.reason, "OK")
});
