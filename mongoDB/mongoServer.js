const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


//mongodb://127.0.0.1:27017
// Connection URL
const url = 'mongodb://localhost:27017';


// Database Name
const dbName = 'users';

//Collection Name
CollectionName = 'users';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);



/*

*/


  //Insert strings
  const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection(CollectionName);
    // Insert some documents
    collection.insertMany([
      { first_name: "hello1" }, { first_name: "hello2" }, { first_name: "hello3" }
    ], function (err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  };




  insertDocuments(db, function () {
    client.close();
  });
});



