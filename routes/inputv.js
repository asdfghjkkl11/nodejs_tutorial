var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ERealm= require('./edge');
var VRealm= require('./vertex');
router.use(bodyParser.urlencoded({extended: true}));
router.get('/', function(req, res, next) {
  let list=VRealm.objects('Vertex').sorted('index');
  res.render('inputv', {});
});
router.post('/', function(req, res, next) {
/*
name: req.body['name'],
zone: req.body['zone'],
start: req.body['start'],
end: req.body['end'],
waiting: parseInt(req.body['waiting']),
x: parseInt(req.body['x']),
y: parseInt(req.body['y']),
tall: parseInt(req.body['tall']),
*/
  VRealm.write(() => {
    VRealm.create('Vertex', {
      index: parseInt(req.body['index'])
    },true);
  });
  res.render('inputv', {});
});
module.exports = router;
