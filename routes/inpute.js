var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ERealm= require('./edge');
var VRealm= require('./vertex');
router.use(bodyParser.urlencoded({extended: true}));
router.get('/', function(req, res, next) {
  let list=ERealm.objects('Edge').sorted('index');
  res.render('inpute', {});
});
router.post('/', function(req, res, next) {
/*
distance: parseInt(req.body['distance']),
index1: parseInt(req.body['index1']),
index2: parseInt(req.body['index2']),
*/
  ERealm.write(() => {
    ERealm.create('Edge', {
      index: parseInt(req.body['index']),
    },true);
  });
  res.render('inpute', {});
});
module.exports = router;
