var ERealm= require('./edge');
var VRealm= require('./vertex');
let Edge=ERealm.objects('Edge').sorted('index');
let Vertex=VRealm.objects('Vertex').sorted('index');
function stoi(str){
  let num=Number(str);
  let hour=num/100;
  let min=num%100;
  return (hour*60)+min;
};
let visit=[];
let open=[];
let waiting=[];
let tall=[];
let start=[];
let end=[];
let Vsize=Vertex.length;
let Esize=Edge.length;
let mat=Array(Vsize).fill(null).map(()=>Array());
let map=Array(Vsize).fill(1000000).map(()=>Array(Vsize).fill(1000000));
let pre=Array(Vsize).fill(-1).map(()=>Array(Vsize).fill(-1));
let routes=Array(Vsize).fill(null).map(()=>Array(Vsize).fill(null).map(()=>Array()));
for(var i=0;i<Vsize;i++){
  visit.push(0);
  open.push(0);
  waiting.push(Vertex[i].waiting);
  tall.push(Vertex[i].tall);
  start.push(stoi(Vertex[i].start));
  end.push(stoi(Vertex[i].end));
  map[i][i]=0;
  pre[i][i]=i;
}
for(var i=0;i < Esize;i++){
  mat[Edge[i].index1].push([Edge[i].index2,Edge[i].distance]);
  mat[Edge[i].index2].push([Edge[i].index1,Edge[i].distance]);
  map[Edge[i].index1][Edge[i].index2]=Edge[i].distance;
  map[Edge[i].index2][Edge[i].index1]=Edge[i].distance;
  pre[Edge[i].index2][Edge[i].index1]=Edge[i].index2;
  pre[Edge[i].index1][Edge[i].index2]=Edge[i].index1;
}
for(var k=0; k<Vsize; k++)
  for(var i=0; i<Vsize; i++)
    for(var j=0; j<Vsize; j++)
      if(map[i][j]>map[i][k]+map[k][j]){
        map[i][j]=map[i][k]+map[k][j];
        pre[i][j]=pre[k][j];
      }
for(var i=0; i<Vsize; i++)
  for(var j=0; j<Vsize; j++){
    var p=pre[i][j];
    routes[i][j].unshift(j);
    while(p!=i){
      routes[i][j].unshift(p);
      p=pre[i][p];
    }
    routes[i][j].unshift(i);
  }
for(var i=0; i<Vsize; i++)
  mat[i].sort(function(a,b){
    return a[1]-b[1];
  });
let route =[];
let turn = 0;
let time=0;
function DFS(src,drc){
  for(var i=0; i < mat[drc].length; i++)
    if(visit[mat[drc][i][0]]==0){
      route.push(mat[drc][i][0]);
      visit[mat[drc][i][0]]=1;
      time+=mat[drc][i][1];
      time+=waiting[mat[drc][i][0]]+turn;
      turn=0;
      DFS(drc,mat[drc][i][0]);
    }
  turn+=map[src][drc];
  route.push(src);
}
DFS(37,37);
var FW={
  entrance: 37,
  Fvisit: visit,
  Fopen: open,
  Fwaiting: waiting,
  Ftall: tall,
  Fmat: mat,
  Fstart: start,
  Fend: end,
  Fmap: map,
  Froute: route,
  Froutes: routes,
  Ftime: time
};
module.exports=FW;
