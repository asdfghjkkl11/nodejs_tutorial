var Realm = require('realm');
var Vkey = new Int8Array(64);
let VSchema = {
  name: 'Vertex',
  primaryKey: 'index',
  properties: {
    name: 'string',
    zone: 'string',
    start: 'string',
    end: 'string',
    waiting: 'int',
    x: 'int',
    y: 'int',
    tall: 'int',
    index: 'int'
  }
};
var VRealm = new Realm({
  path: 'Vertex.realm',
  schema: [VSchema],
  encryptionKey:Vkey,
  schemaVersion: 3,
});

module.exports = VRealm;
