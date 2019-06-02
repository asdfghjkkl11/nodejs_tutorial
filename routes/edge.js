var Realm = require('realm');
var Ekey = new Int8Array(64);
let ESchema = {
  name: 'Edge',
  primaryKey: 'index',
  properties: {
    index: 'int',
    distance: 'int',
    index1: 'int',
    index2: 'int',
  }
};
var ERealm = new Realm({
  path: 'Edge.realm',
  schema: [ESchema],
  encryptionKey:Ekey,
  schemaVersion: 3
});
module.exports = ERealm;
