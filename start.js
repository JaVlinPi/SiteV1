var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const DatabaseController = require('./DatabaseController.js');

console.log('here');
const dbName = 'gamesitev1';
var db = new DatabaseController(dbName);

// db test code
db.get('users',(data)=>{
  console.log('db.users data:'+data);
  console.log(data);
  console.log('data.length:'+data.length);
  var u = data.find(user => {return user.name == 'GIC'})
  console.log('u:'+u);
  console.log(u);
  if ( u == undefined ) {
    db.insert('users',{name:'GIC',password:'password1'},(data)=>{
      console.log('1 data:'+data);
      console.log(data);
      console.log(data.ops);
    });
  }
});
console.log('here 2');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
