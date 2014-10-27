var BPromise = require('bluebird');

function DbController(db) {
  self = this;
  self.db = db;
}


DbController.prototype.save = function(key, value) {
  console.log("Saving", key, "=", value);
  return self.db.setAsync(key, value);
};

module.exports = exports = DbController;


