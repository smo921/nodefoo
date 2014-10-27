#!/usr/bin/env node

var BPromise = require('bluebird');


var arrayMe = function(l) {
  var ret = [];
  for (var cnt = 0; cnt < l; ++cnt) {
    ret[cnt] = 'foo';
    if (cnt === l-1) { return ret; }
  }
};

var modArray = function(arr) {
  return new BPromise(function(resolve, reject) {
    return resolve(BPromise.map(arr, function(item, index) {
      if (index % 2 === 0) { return 'bar'; }
      else { return 'a'; }
    })
    .then(function(y) { console.log("Y:", y); return y; })
    .filter(function(x) {
      return x === 'a';
    })

    );
  });
};

var doit = function() {
  var a = arrayMe(5);
  console.log("A:", a);
   modArray(a)
  .then(function(ret) { a = ret; console.log("A:", a); });
};

doit();
