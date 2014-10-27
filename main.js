#!/usr/bin/env node

var BPromise = require('bluebird');
var DbController = require('./dbController');
var redisDb = require('redis');


client = redisDb.createClient(49153, '127.0.0.1');
BPromise.promisifyAll(client);

function foo() {
  return new BPromise(function(resolve, reject) {
    resolve("bar");
  });
}

var dbc = new DbController(client);
dbc.save('a', 'b').then(function() {
  return client.getAsync('a');
}).then(function(a) { console.log("A:", a); });

var a = {key: 'string'};
dbc.save(a.key, 'b');

foo().then(function(ret) { console.log("foo():", ret); });

client.setAsync('foo', 'bar')
  .then(function() { return client.getAsync('foo'); })
  .then(function(x) { console.log("FOO:", x); });

client.keysAsync('*').then(function(keys) { console.log("KEYS:", keys); });

