console.log('Database file loaded');
var MongoClient = require('mongodb').MongoClient;

// My module
function DatabaseController(dbName) {
  console.log('Database('+dbName+')');
  this.foo = 'bar';
  this.dbName = dbName;


  // this.url = "mongodb://localhost:27017/mydb";
  this.url = "mongodb://localhost:27017/"+dbName;
}

DatabaseController.prototype.insert = function(listName,object,callback) {
  console.log('foo:'+this.bar);
  // MongoClient.connect(url, function(err, db) {
  // MongoClient.connect()
  // MongoClient.connect(this.url, { useNewUrlParser: true }, function(err, db) {
  MongoClient.connect(this.url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    // var dbo = db.db("mydb");
    var dbo = db.db(this.dbName);
    // var myobj = { name: "Company Inc", address: "Highway 37" };
    // dbo.collection("customers").insertOne(myobj, function(err, res) {
    dbo.collection(listName).insertOne(object, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      console.log('res:'+res);
      if ( callback != undefined ) {
        callback(res);
      }
      db.close();
    });
  });
};

DatabaseController.prototype.get = function(listName,callback) {
  console.log('this.foo:'+this.foo);
  console.log('this.url:'+this.url);
  // MongoClient.connect(url, function(err, db) {
  MongoClient.connect(this.url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    // var dbo = db.db("mydb");
    console.log('this.dbName:'+this.dbName);
    var dbo = db.db(this.dbName);
    // var myobj = { name: "Company Inc", address: "Highway 37" };
    // dbo.collection("customers").insertOne(myobj, function(err, res) {
    /*
    dbo.collection(listName).insertOne(object, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      console.log('res:'+res);
      if ( callback != undefined ) {
        callback(res);
      }
      db.close();
    });
    */
    dbo.collection(listName).find().toArray(function(err, res) {
      if (err) throw err;
      console.log("all documents found");
      console.log('res:'+res);
      if ( callback != undefined ) {
        callback(res);
      }
      db.close();
    });
  });
};



module.exports = DatabaseController;

// In another module:
// var MyObjectOrSomeCleverName = require("./my_object.js");
// var my_obj_instance = new MyObjectOrSomeCleverName("foobar");
// my_obj_instance.foo(); // => "foobar"



// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.createCollection("customers", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });

