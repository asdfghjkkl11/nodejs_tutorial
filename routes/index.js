var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ERealm= require('./edge');
var VRealm= require('./vertex');
var FW= require('./FW');
router.use(bodyParser.urlencoded({extended: true}));
router.get('/', function(req, res, next) {
  var tall = (req.query.tall)?req.query.tall:150;
  let Vertex=VRealm.objects('Vertex').sorted('index');
  let Edge=ERealm.objects('Edge').sorted('index');
  let talls=[];
  for(var i=0;i<Vertex.length;i++)
    if(Vertex[i].tall==0||Vertex[i].tall<tall)
      talls.push(1);
    else
      talls.push(0);
  res.render('index', {Edge:Edge,Vertex:Vertex,talls:talls,tall:tall,route:[],time:-1});
});
router.post('/', function(req, res, next) {
  var route = req.body['route'].split(',');
  var tall = Number(req.body['tall']);
  let Edge=ERealm.objects('Edge').sorted('index');
  let Vertex=VRealm.objects('Vertex').sorted('index');
  let talls=[];
  for(var i=0;i<Vertex.length;i++)
    if(Vertex[i].tall==0||Vertex[i].tall<tall)
      talls.push(1);
    else
      talls.push(0);
  let result=[];
  let time=0;
  if(((route.length==1&&route[0]=='')||route.length==Vertex.length)&&tall==150){
    result=FW.Froute;
    time=FW.Ftime;
  }else if(route.length==1&&route[0]==''){
    let visit=Array(Vertex.length).fill(0);
    let count=0;
    var point=37;
    for(var i=0;i<Vertex.length;i++){
      visit[i]=talls[i];
      count++;
    }
    result.push(point);
    while(count!=0){
      var min=-1;
      for(var i=0;i<Vertex.length;i++)
        if(visit[i]==1){
          min=(min==-1)?i:min;
          min=(FW.Fmap[point][i]<FW.Fmap[point][min])?i:min;
        }
      if(min==-1)
        break;
      result.pop();
      result=result.concat(FW.Froutes[point][min]);
      visit[min]=0;
      count--;
      point=min;
    }
    for(var i=0;i<result.length-1;i++){
      if(Vertex[result[i]].tall==0||Vertex[result[i]].tall>=tall)
        time+=Vertex[result[i]].wating;
      time+=FW.Fmap[result[i]][result[i+1]];
    }
    time+=Vertex[result[result.length-1]].wating;
  }else{
    let visit=Array(Vertex.length).fill(0);
    let count=route.length;
    var point=37;
    for(var i=0;i<route.length;i++)
      visit[route[i]]=1;
    result.push(point);
    while(count!=0){
      var min=-1;
      for(var i=0;i<Vertex.length;i++)
        if(visit[i]==1){
          min=(min==-1)?i:min;
          min=(FW.Fmap[point][i]<FW.Fmap[point][min])?i:min;
        }
      result.pop();
      result=result.concat(FW.Froutes[point][min]);
      visit[min]=0;
      count--;
      point=min;
    }
    for(var i=0;i<result.length-1;i++){
      if(Vertex[result[i]].tall==0||Vertex[result[i]].tall>=tall)
        time+=Vertex[result[i]].waiting;
      time+=FW.Fmap[result[i]][result[i+1]];
    }
    time+=Vertex[result[result.length-1]].waiting;
  }
  console.log(result,time);
  res.render('index', {Edge:Edge,Vertex:Vertex,talls:talls,tall:tall,route:result,time:time});
});
module.exports = router;
