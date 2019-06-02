var express = require('express');
var path = require('path');
var index = require('./routes/index');
var inputv = require('./routes/inputv');
var inpute = require('./routes/inpute');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/node_modules',express.static(path.join(__dirname,'/node_modules')));
app.use('/static', express.static(path.join(__dirname + '/public')));
app.use('/',index);
//add vertexs & edges
//app.use('/inputv',inputv);
//app.use('/inpute',inpute);
app.get('*',function(req,res,next){
  res.status(404);
  if(req.accepts('html')){
    res.render('404',{url:req.url});
    return;
  }
  if(req.accepts('json')){
    res.send({error:'Not found'});
    return;
  }
  res.type('txt').send('Not found');
});
app.listen(3000, function() {
  console.log("Connect!");
});
